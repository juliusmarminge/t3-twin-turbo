import { createContext, useContext, useEffect, type ReactNode } from "react";
import { useStorage } from "@plasmohq/storage/hook";
import { env } from "~src/env";

import { storage } from "./storage";

export function signIn() {
  window.open(
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    `${env.PLASMO_PUBLIC_WEB_URL}/api/auth/signin?` +
      new URLSearchParams({
        callbackUrl: `${env.PLASMO_PUBLIC_WEB_URL}/ext-auth/signin`,
      }),
  );
}

export function signOut() {
  window.open(`${env.PLASMO_PUBLIC_WEB_URL}/ext-auth/signout`);
}

type AuthContextType = {
  token: string;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const useSession = () => {
  const value = useContext(AuthContext);
  return value;
};

export const AuthProvider = (props: { children: ReactNode }) => {
  const [token] = useStorage<string>({ key: "accessToken", instance: storage });

  useEffect(() => {
    void storage.get("accessToken").then((token) => {
      console.log("token", token);
      // maybe validate token on the server
    });
  }, []);

  return (
    <AuthContext.Provider value={token ? { token } : null}>
      {props.children}
    </AuthContext.Provider>
  );
};
