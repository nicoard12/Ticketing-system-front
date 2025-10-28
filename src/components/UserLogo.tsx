import React, { useState, useRef, useEffect } from "react";
import { UserIcon, LogOutIcon } from "lucide-react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

function UserLogo() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { logout, user } = useAuth0();

  const logoutUser = () => {
    logout({ logoutParams: { returnTo: window.location.origin } });
    localStorage.removeItem("app_token");
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div className="relative text-black" ref={ref}>
      <button
        className="cursor-pointer flex items-center justify-center w-10 h-10 rounded-full "
        onClick={() => setOpen((prev) => !prev)}
      >
        <img src={user!.picture} alt={user!.name} className="rounded-full"/>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-10 text-sm">
          <ul className="py-1">
            <li>
              <button
                onClick={() => navigate("/perfil")}
                className="w-full flex items-center gap-2 text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                <UserIcon className="w-4 h-4" />
                Perfil
              </button>
            </li>
            <li>
              <button
                onClick={logoutUser}
                className="w-full flex items-center gap-2 text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                <LogOutIcon className="w-4 h-4" />
                Cerrar sesión
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default UserLogo;
