import { useState } from "react";
import useEncryption from "../hooks/useEncryption";

const EncryptionComponent = () => {
  const {
    isKeyInitialized,
    encryptedData,
    decryptedData,
    error,
    initializeKey,
    encryptData,
    decryptData,
  } = useEncryption();

  const [password, setPassword] = useState("");

  const handleInitialize = () => {
    initializeKey(password || "test");
  };

  const handleEncrypt = async () => {
    const useData = "données sensibles";
    await encryptData(useData);
  };

  const handleDecrypt = async () => {
    if (encryptedData) {
      await decryptData(encryptedData);
    }
  };

  return (
    <div className="flex flex-col max-w-md mx-auto mb-10">
      <h2>Encryption Demo</h2>
      {error && <p style={{ color: "red" }}>Erreur: {error.message}</p>}
      <p className="my-4">
        Clé initialisée : {isKeyInitialized ? "Oui" : "Non"}
      </p>

      {!isKeyInitialized && (
        <div className="flex flex-col gap-4">
          <input
            type="password"
            placeholder="Entrez votre mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="button" onClick={handleInitialize}>
            Initialiser
          </button>
        </div>
      )}

      {isKeyInitialized && (
        <div>
          <div className="flex flex-col gap-4 mb-4">
            <button type="button" className="" onClick={handleEncrypt}>
              Chiffrer les données
            </button>
            <button type="button" onClick={handleDecrypt}>
              Déchiffrer les données
            </button>
          </div>
          <div className="flex flex-col gap-4">
            <p>Données chiffrées : {encryptedData}</p>
            <p>Données déchiffrées: {decryptedData}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default EncryptionComponent;
