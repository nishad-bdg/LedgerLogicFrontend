import { useRouter } from "next/router";
import { useEffect } from "react";
import { getToken } from "../store/authStore";

const useAuthMiddleware = () => {
  const router = useRouter();

  useEffect(() => {
    const authToken = getToken();

    if (!authToken) {
      router.push("/");
    }
  }, []);

  return null;
};

export default useAuthMiddleware;
