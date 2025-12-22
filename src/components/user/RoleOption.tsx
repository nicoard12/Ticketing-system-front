import type { Rol } from "@/api/users";
import React from "react";

type RoleOptionType = {
  value: Rol;
  current_role: Rol;
  Icon: React.ComponentType;
  openModal: (role: Rol) => void;
};

function RoleOption({ value, current_role, Icon, openModal }: RoleOptionType) {
  if (value === current_role) return null;
  return (
    <p
      onClick={() => openModal(value)}
      className="flex items-center gap-2 p-3 cursor-pointer hover:bg-gray-100 font-semibold"
    >
      {" "}
      <Icon /> {value.charAt(0).toUpperCase() + value.slice(1)}
    </p>
  );
}

export default RoleOption;
