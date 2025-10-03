
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

getLocation(result => {
  alert(result);
});
