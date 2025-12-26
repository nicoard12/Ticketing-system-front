import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { createUser, type Rol, type User } from "@/api/users";
import { toast } from "sonner";
type ExtendedUser = User | null;

type ContextTypeUser = {
  user: ExtendedUser;
  contextLoading: Boolean;
};

const UserContext = createContext<ContextTypeUser | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { user, isAuthenticated, getAccessTokenSilently, isLoading } =
    useAuth0();
  const [extendedUser, setExtendedUser] = useState<ExtendedUser>(null);
  const [contextLoading, setContextLoading] = useState(true);

  const register = async () => {
    if (!user) return;

    const newUser: User = {
      idAuth: user.sub!,
      nombre: user.name!,
      email: user.email!,
      imagen: user.picture!,
      rol: "normal" as Rol,
    };
    try {
      const response = await createUser(newUser); //Si ya estaba registrado devuelve el usuario registrado
      setExtendedUser(response);
    } catch (error) {
      if (
        error &&
        typeof error === "object" &&
        "code" in error &&
        (error as any).code === "ERR_NETWORK"
      ) {
        toast.error(
          "Error al conectar con el servidor, por favor intentalo más tarde."
        );
      }
    }
  };

  useEffect(() => {
    if (extendedUser) setContextLoading(false);
  }, [extendedUser]);

  useEffect(() => {
    if (isLoading) return;
    if (isAuthenticated && user && !extendedUser) {
      getAccessTokenSilently().then((token) => {
        if (localStorage.getItem("app_token") !== token) {
          localStorage.setItem("app_token", token);
        }
      });

      register();
    } else {
      setContextLoading(false);
    }
  }, [isAuthenticated, user, isLoading]);

  return (
    <UserContext.Provider
      value={{ user: extendedUser, contextLoading: contextLoading }}
    >
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
