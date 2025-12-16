import { createContext, useContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { createUser, type Rol, type User } from "@/api/users";
type ExtendedUser = (User & { picture: string }) | null;

type ContextTypeUser = {
  user: ExtendedUser;
};

const UserContext = createContext<ContextTypeUser | undefined>(undefined);

export const UserProvider = ({ children }) => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [extendedUser, setExtendedUser] = useState<ExtendedUser>(null);

  const register = async () => {
    if (!user) return;

    const newUser: User = {
      idAuth: user.sub!,
      nombre: user.name!,
      email: user.email!,
      rol: "normal" as Rol,
    };
    try {
      const response = await createUser(newUser); //Si ya estaba registrado devuelve el usuario registrado
      setExtendedUser({
        ...response,
        picture: user.picture!,
      });
    } catch (error) {
      console.log("error, ",error)
      if (error.code == "ERR_NETWORK") alert("Error al conectar con el servidor, por favor intentalo mas tarde.")
    }
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
