import { useState, useEffect } from "react";

import {
  isDEKExists,
  decryptUserData,
  encryptUserData,
  initializeEncryption,
} from "../common/utils/encryption/encryptionServices";

const useEncryption = () => {
  const [isKeyInitialized, setIsKeyInitialized] = useState(false);
  const [encryptedData, setEncryptedData] = useState<string | null>("");
  const [decryptedData, setDecryptedData] = useState<string | null>("");
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const checkKey = async () => {
      try {
        const exists = await isDEKExists();
        setIsKeyInitialized(exists);
      } catch (err) {
        setError(err as Error);
      }
    };
    checkKey();
  }, []);

  const initializeKey = async (password: string): Promise<void> => {
    try {
      await initializeEncryption(password);
      setIsKeyInitialized(true);
    } catch (err) {
      setError(err as Error);
    }
  };

  const encryptData = async (data: string): Promise<void> => {
    try {
      const encrypted = await encryptUserData(data);
      setEncryptedData(encrypted);
    } catch (err) {
      setError(err as Error);
    }
  };

  const decryptData = async (data: string): Promise<void> => {
    try {
      const decrypted = await decryptUserData(data);
      setDecryptedData(decrypted);
    } catch (err) {
      setError(err as Error);
    }
  };

  return {
    isKeyInitialized,
    encryptedData,
    decryptedData,
    error,
    initializeKey,
    encryptData,
    decryptData,
  };
};

export default useEncryption;
