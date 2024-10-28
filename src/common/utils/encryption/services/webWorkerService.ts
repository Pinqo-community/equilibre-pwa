const worker = new Worker(
  new URL("../workers/encryptionWorker.ts", import.meta.url),
);

export function storeDEKInWorker(dek: CryptoKey): Promise<void> {
  return new Promise((resolve) => {
    worker.postMessage({ action: "setDEK", dek });
    worker.onmessage = (e) => {
      if (e.data.status === "success") resolve();
    };
  });
}

export function getDEKFromWorker(): Promise<CryptoKey | null> {
  return new Promise((resolve) => {
    worker.postMessage({ action: "getDEK" });
    worker.onmessage = (e) => {
      resolve(e.data.dek || null);
    };
  });
}
