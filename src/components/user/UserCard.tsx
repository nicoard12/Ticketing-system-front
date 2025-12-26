import { changeRoleUser, type Rol, type User } from "@/api/users";
import React, { useEffect, useRef, useState } from "react";
import {
  CircleUserRound,
  User as LuUser,
  UserPen,
  UserStar,
  ShieldUser,
} from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import ModalUserConfirmation from "./ModalUserConfirmation";
import RoleOption from "./RoleOption";

const MAIN_ADMIN_EMAIL = "nico.ticketingsystem.iaw@gmail.com";

function UserCard({ user }: { user: User }) {
  const [failedImage, setFailedImage] = useState(false);
  const [openRoles, setOpenRoles] = useState(false);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [current_role, setCurrent_role] = useState(user.rol);
  const [selectedRole, setSelectedRole] = useState(user.rol);
  const ref = useRef<HTMLDivElement>(null);

  const esAdminPrincipal = () => {
    return user.email == MAIN_ADMIN_EMAIL;
  };

  const showRoles = () => {
    if (esAdminPrincipal()) {
      toast.warning("No podés modificar el rol del admin principal");
    } else setOpenRoles(!openRoles);
  };

  const openModal = (role: Rol) => {
    setOpenRoles(false);
    setSelectedRole(role);
    setOpenConfirmation(true);
  };

  const changeRole = async () => {
    try {
      await changeRoleUser(user.idAuth, selectedRole);
      setOpenConfirmation(false);
      setCurrent_role(selectedRole);
      toast.success("Rol cambiado con éxito");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error al cambiar el rol";
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpenRoles(false);
      }
    }
    if (openRoles) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openRoles]);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-5 bg-white rounded text-black p-3">
      <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0">
        {failedImage ? (
          <CircleUserRound className="w-16 h-16 sm:w-20 sm:h-20 text-gray-400" />
        ) : (
          <img
            src={user!.imagen}
            alt={user!.nombre}
            onError={() => setFailedImage(true)}
            className="w-full h-full rounded-full object-cover"
          />
        )}
      </div>

      <div className="flex flex-col gap-3 flex-1 overflow-x-auto">
        <h2 className="font-bold text-lg">{user.nombre}</h2>
        <p>Email: {user.email}</p>
        <p>
          Rol: <span className="uppercase font-medium">{current_role}</span>
        </p>
      </div>

      <div ref={ref} className="relative">
        <Button
          onClick={showRoles}
          size={"sm"}
          variant={"outline"}
          className={esAdminPrincipal() ? "cursor-not-allowed" : ""}
        >
          Cambiar rol
        </Button>
        {openRoles && (
          <div className="absolute right-0 bg-white border rounded shadow-lg z-10 text-sm">
            <RoleOption value="normal" current_role={current_role} Icon={LuUser} openModal={openModal} />
            <RoleOption
              value="productor"
              current_role={current_role}
              Icon={UserPen}
              openModal={openModal}
            />
            <RoleOption value="staff" current_role={current_role} Icon={UserStar} openModal={openModal} />
            <RoleOption value="admin" current_role={current_role} Icon={ShieldUser} openModal={openModal} />
          </div>
        )}
      </div>

      {openConfirmation && (
        <ModalUserConfirmation
          selectedRole={selectedRole}
          current_role={current_role}
          user={user}
          confirm={changeRole}
          cancel={() => setOpenConfirmation(false)}
        />
      )}
    </div>
  );
}

export default UserCard;
