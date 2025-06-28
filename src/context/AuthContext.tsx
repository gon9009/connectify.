import { createContext, useContext, useEffect, useState } from "react";
import { Loader } from "@/components/ui";
import { getCurrentUser } from "../lib/appwrite/api";
import { INITIAL_USER, INITIAL_STATE } from "../constants/authState";
import { ContextType } from "../types/types";

const AuthContext = createContext<ContextType>(INITIAL_STATE);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태
  const [user, setUser] = useState(INITIAL_USER); // 유저 상태 보관

  // 초기 인증 체크
  useEffect(() => {
    checkAuth();
  }, []);

  // 사용자 인증 체크 함수 (T / F) 를 반환하도록
  const checkAuth = async () => {
    setIsLoading(true);
    try {
      const currentUser = await getCurrentUser();
      if (currentUser) {
        setUser({
          id: currentUser.$id,
          name: currentUser.name,
          username: currentUser.username,
          email: currentUser.email,
          imageUrl: currentUser.imageUrl,
          bio: currentUser.bio ?? "",
        });
        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <Loader />;

  const value = {
    user,
    setUser,
    isLoading,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useUserContext = () => useContext(AuthContext);
