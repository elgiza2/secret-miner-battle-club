import { useEffect, useState } from "react";

const KEY = "zro_wallet_verified_v1";

/** Whether this device's player paid the verification fee. Design stage: stored locally until the database is wired. */
export function useWalletVerified() {
  const [verified, setVerified] = useState<boolean | null>(null);
  useEffect(() => {
    try {
      setVerified(localStorage.getItem(KEY) === "1");
    } catch {
      setVerified(false);
    }
  }, []);
  return verified;
}
