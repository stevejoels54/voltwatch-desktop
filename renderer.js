async function testIt() {
  const filters = [
    { usbVendorId: 0x2341, usbProductId: 0x0043 },
    { usbVendorId: 0x2341, usbProductId: 0x0001 },
  ];
  try {
    const port = await navigator.serial.requestPort({ filters });
    const portInfo = port.getInfo();
    document.getElementById(
      "device-name"
    ).innerHTML = `vendorId: ${portInfo.usbVendorId} | productId: ${portInfo.usbProductId} `;
    await port.open({ baudRate: 9600 });
    const reader = port.readable.getReader();
    while (true) {
      const { value, done } = await reader.read();
      if (done) {
        break;
      }
      console.log(value);
    }
  } catch (ex) {
    if (ex.name === "NotFoundError") {
      document.getElementById("device-name").innerHTML = "Device NOT found";
    } else {
      document.getElementById("device-name").innerHTML = ex;
    }
  }
}

document.getElementById("clickme").addEventListener("click", testIt);
