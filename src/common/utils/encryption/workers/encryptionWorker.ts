let dek: CryptoKey | null = null;

self.addEventListener("message", (e) => {
  const { action } = e.data;

  if (action === "setDEK") {
    dek = e.data.dek;
    postMessage({ status: "success" });
  } else if (action === "getDEK") {
    postMessage({ dek });
  }
});
