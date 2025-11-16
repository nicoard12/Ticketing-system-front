import { createContext, useContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { createUsuario, type Rol, type Usuario } from "@/api/usuarios";

type UsuarioExtendido = (Usuario & { picture: string }) | null;

type UsuarioContextType = {
  user: UsuarioExtendido;
};

const UserContext = createContext<UsuarioContextType | undefined>(undefined);

export const UserProvider = ({ children }) => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [extendedUser, setExtendedUser] = useState<UsuarioExtendido>(null);

  const register = async () => {
    if (!user) return;

    const newUser: Usuario = {
      idAuth: user.sub!,
      nombre: user.name!,
      email: user.email!,
      rol: "normal" as Rol,
    };

    const response = await createUsuario(newUser);
    console.log(response);
    setExtendedUser({
      ...response,
      picture: user.picture!,
    });
  };

  useEffect(() => {
    if (isAuthenticated && user && !extendedUser) {
      getAccessTokenSilently().then((token) => {
        if (localStorage.getItem("app_token") !== token) {
          localStorage.setItem("app_token", token);
        }
      });

      register();
    }
  }, [isAuthenticated, user]);

  return (
    <UserContext.Provider value={{ user: extendedUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUsuario = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUsuario debe usarse dentro de un UserProvider");
  }
  return context;
};
