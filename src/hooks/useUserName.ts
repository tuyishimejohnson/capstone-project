import { useState, useEffect } from "react";

export function useUserName() {
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserName = async () => {
      const userDataString = localStorage.getItem("userData");
      let userToken = "";
      if (userDataString) {
        try {
          const userData = JSON.parse(userDataString);
          userToken = userData?.name || "";
        } catch (e) {
          userToken = "";
        }
      }
      setUserName(userToken || "");
      setTimeout(() => setLoading(false), 1000);
    };
    getUserName();
  }, []);

  return { userName, loading };
}
