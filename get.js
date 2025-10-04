async function collectPublicClientInfo() {
  const nav = navigator || {};
  const scr = window.screen || {};
  const perf = (typeof performance !== "undefined") ? performance : null;

  function checkStorageSupport() {
    let local = false, session = false;
    try { localStorage.setItem('__chk','1'); localStorage.removeItem('__chk'); local = true; } catch(e){}
    try { sessionStorage.setItem('__chk','1'); sessionStorage.removeItem('__chk'); session = true; } catch(e){}
    return { localStorage: local, sessionStorage: session };
  }

  function detectFonts(candidateFonts = [
    "Arial", "Verdana", "Times New Roman", "Courier New", "Segoe UI",
    "Roboto", "Noto Sans", "Helvetica", "Georgia", "Tahoma"
  ]) {
    try {
      const baseTxt = "mmmmmmmmmmlli";
      const cvs = document.createElement("canvas");
      const ctx = cvs.getContext("2d");
      const fallback = "monospace";
      ctx.font = `16px ${fallback}`;
      const baseW = ctx.measureText(baseTxt).width;
      const res = {};
      for (const f of candidateFonts) {
        ctx.font = `16px '${f}', ${fallback}`;
        const w = ctx.measureText(baseTxt).width;
        res[f] = (w !== baseW);
      }
      return { supported: true, fonts: res };
    } catch (e) {
      return { supported: false, error: e.message };
    }
  }

  const info = {
    collectedAt: new Date().toISOString(),
    navigator: {
      userAgent: nav.userAgent || null,
      userAgentData: nav.userAgentData ? {
        brands: nav.userAgentData.brands || nav.userAgentData.uaList || null,
        mobile: nav.userAgentData.mobile || null,
        platform: nav.userAgentData.platform || null
      } : null,
      platform: nav.platform || null,
      appName: nav.appName || null,
      appVersion: nav.appVersion || null,
      product: nav.product || null,
      vendor: nav.vendor || null,
      language: nav.language || null,
      languages: nav.languages || null,
      cookieEnabled: typeof nav.cookieEnabled === 'boolean' ? nav.cookieEnabled : null,
      onLine: typeof nav.onLine === 'boolean' ? nav.onLine : null,
      hardwareConcurrency: nav.hardwareConcurrency || null,
      deviceMemoryGB: nav.deviceMemory || null,
      maxTouchPoints: nav.maxTouchPoints || 0,
      doNotTrack: nav.doNotTrack || null,
      webdriver: typeof nav.webdriver === 'boolean' ? nav.webdriver : null,
      mimeTypes: (() => {
        try { return Array.from(nav.mimeTypes || []).map(m=>m.type); } catch(e){ return null; }
      })(),
      plugins: (() => {
        try { return Array.from(nav.plugins || []).map(p => p.name || p.filename || null); } catch(e) { return null; }
      })()
    },
    screen: {
      width: scr.width || null,
      height: scr.height || null,
      availWidth: scr.availWidth || null,
      availHeight: scr.availHeight || null,
      colorDepth: scr.colorDepth || null,
      pixelDepth: scr.pixelDepth || null,
      devicePixelRatio: window.devicePixelRatio || 1,
      orientation: (scr.orientation && scr.orientation.type) ? scr.orientation.type : (scr.orientation || null)
    },
    viewport: {
      innerWidth: window.innerWidth || null,
      innerHeight: window.innerHeight || null,
      outerWidth: window.outerWidth || null,
      outerHeight: window.outerHeight || null
    },
    connection: (() => {
      try {
        const c = nav.connection || nav.mozConnection || nav.webkitConnection;
        if (!c) return null;
        return {
          effectiveType: c.effectiveType || null,
          downlink: c.downlink || null,
          rtt: c.rtt || null,
          saveData: typeof c.saveData === 'boolean' ? c.saveData : null,
          type: c.type || null
        };
      } catch (e) { return null; }
    })(),
    intl: {
      timezone: (Intl && Intl.DateTimeFormat) ? Intl.DateTimeFormat().resolvedOptions().timeZone : null,
      locale: (Intl && Intl.DateTimeFormat) ? Intl.DateTimeFormat().resolvedOptions().locale : null,
      timezoneOffsetMinutes: new Date().getTimezoneOffset()
    },
    storageEstimate: null,
    performance: (() => {
      try {
        if (!perf) return null;
        const navEntries = perf.getEntriesByType && perf.getEntriesByType("navigation");
        const e = (navEntries && navEntries[0]) || perf.timing || null;
        if (!e) return null;
        return {
          timeOrigin: perf.timeOrigin || null,
          domContentLoadedEventEnd: e.domContentLoadedEventEnd || e.domContentLoadedEventEnd || null,
          loadEventEnd: e.loadEventEnd || null
        };
      } catch (x) { return null; }
    })(),
    storageSupport: checkStorageSupport(),
    fonts: detectFonts()
  };

  try {
    if (navigator.storage && navigator.storage.estimate) {
      const est = await navigator.storage.estimate();
      info.storageEstimate = {
        quota: est.quota || null,
        usage: est.usage || null
      };
    }
  } catch (e) {
    info.storageEstimate = { error: e.message };
  }

  return info;
}
