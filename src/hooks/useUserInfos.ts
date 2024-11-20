import { useState, useEffect, useCallback } from "react";
import usePouchDb from "./usePouchDb";
import { UserInfo } from "../types/UserInfo";

/**
 * Hook to fetch user information
 * @returns userInfo and fetchUserInfo
 */
const useUserInfo = () => {
  const { fetchDocs } = usePouchDb<UserInfo>();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  // Fetch user information
  const fetchUserInfo = useCallback(async () => {
    const result = await fetchDocs();
    if (result.length > 0) {
      setUserInfo(result[0]);
    }
  }, [fetchDocs]);

  // Fetch user information on component mount
  useEffect(() => {
    fetchUserInfo();
  }, [fetchUserInfo]);

  return { userInfo, fetchUserInfo };
};

export default useUserInfo;
