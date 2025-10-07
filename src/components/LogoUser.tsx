import React, { useState, useRef, useEffect } from 'react';
import { UserIcon, LogOutIcon } from 'lucide-react';

function LogoUser() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  return (
    <div className="relative text-black" ref={ref}>
      <button
        className="cursor-pointer flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 transition"
        onClick={() => setOpen((prev) => !prev)}
      >
        <UserIcon className="w-6 h-6 text-gray-600" />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-10 text-sm">
          <ul className="py-1">
            <li>
              <button className="w-full flex items-center gap-2 text-left px-4 py-2 hover:bg-gray-100 cursor-pointer">
                <UserIcon className="w-4 h-4" />
                Perfil
              </button>
            </li>
            <li>
              <button className="w-full flex items-center gap-2 text-left px-4 py-2 hover:bg-gray-100 cursor-pointer">
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

export default LogoUser;