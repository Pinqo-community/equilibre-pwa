const MASTER_PASSWORD = "password";

async function getKeyMaterial() {
  const enc = new TextEncoder();
  return await window.crypto.subtle.importKey("raw", enc.encode(MASTER_PASSWORD), "PBKDF2", false, ["deriveKey"]);
}

function generateIv() {
  return crypto.getRandomValues(new Uint8Array(12));
}
async function encrypt(data: string | undefined, iv: Uint8Array) {
  const keyMaterial = await getKeyMaterial();
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const derivedKey = await window.crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt,
      iterations: 1000,
      hash: "SHA-256",
    },
    keyMaterial,
    {
      name: "AES-GCM",
      length: 256,
    },
    true,
    ["encrypt", "decrypt"]
  );

  if (typeof data === "undefined") {
    throw new Error("No data to encrypt");
  }

  const dataToEncrypt = new TextEncoder().encode(data);
  iv = generateIv();

  return window.crypto.subtle.encrypt({ name: "AES-GCM", iv }, derivedKey, dataToEncrypt);
}
