// This example assumes Buttplug is brought in as a root namespace, via
// inclusion by a script tag, i.e.
//
// <script lang="javascript" 
//   src="https://cdn.jsdelivr.net/npm/buttplug@1.0.16/dist/web/buttplug.min.js">
// </script>
//
// If you're trying to load this, change the version to the latest available.

var connector = null;
var client = null;

async function runDeviceControlExample() {
  // Instantiate our wasm module. This only needs to be done once. If you did it
  // elsewhere, ignore this.
  await Buttplug.buttplugInit();

  // Usual embedded connector setup.
  connector = new Buttplug.ButtplugEmbeddedConnectorOptions();
  client = new Buttplug.ButtplugClient("Device Control Example");
  await client.connect(connector);

  // Set up our DeviceAdded/DeviceRemoved event handlers before connecting. If
  // devices are already held to the server when we connect to it, we'll get
  // "deviceadded" events on successful connect.
  client.addListener("deviceadded", async (device) => {
    console.log(`Device Connected: ${device.Name}`);
    console.log("Client currently knows about these devices:");
    client.Devices.forEach((device) => console.log(`- ${device.Name}`));
    // Device is connected and set up, yay
  });
  client
    .addListener("deviceremoved", (device) => console.log(`Device Removed: ${device.Name}`));

  // Now that everything is set up, we can scan.
  await client.startScanning();
};

// i is the time in seconds
// j is the intensity in percentage with no percent sign
var timeout;
async function rewardVibration(i, j){
  // In Javascript, allowedMessages is a map, so we'll need to iterate its
    // properties.
    device = client.Devices[0];
    console.log("Sending commands");

    // If we aren't working with a toy that vibrates, just return at this point.
    if (!device.messageAttributes(Buttplug.ButtplugDeviceMessageType.VibrateCmd)) {
      return;
    }

    // Now that we know the message types for our connected device, and that our
    // device handles vibration, we can send a message over!
    //
    // There's a couple of ways to send this message.

    // We can use the convenience functions on ButtplugClientDevice to
    // send the message. This version sets all of the motors on a
    // vibrating device to the same speed.
    try {
      await device.vibrate(j/100);
    } catch (e) {
      console.log(e);
      if (e instanceof Buttplug.ButtplugDeviceError) {
        console.log("got a device error!");
      }
    }
    // Clear the old timeout if a new command happens before
    if (timeout) { clearTimeout(timeout); }
    // Start a new timer so if we don't send a new command within the timer it will stop. 
    await new Promise(function (r) {
      timeout = setTimeout(function () {
        device.stop();
        r();
      }, i*1000);
    });

    // If we wanted to just set one motor on and the other off, we could
    // try this version that uses an array. It'll throw an exception if
    // the array isn't the same size as the number of motors available as
    // denoted by FeatureCount, though.
    //
    // You can get the vibrator count using the following code, though we
    // know it's 2 so we don't really have to use it.
    //
    // This vibrateType variable is just used to keep us under 80 
    // characters for the dev guide, so don't feel that you have to reassign 
    // types like this. I'm just trying to make it so you don't have to
    // horizontally scroll in the manual. :)

    /*
    var vibratorCount =
      device.AllowedMessages[vibrateType].FeatureCount;
    await testClientDevice.SendVibrateCmd(new [] { 1.0, 0.0 });
    */
}
