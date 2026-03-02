import {
  SearchIcon,
} from "lucide-react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

import { useEffect, useRef } from "react";

type SearchbarProps = {
  search: string;
  setSearch: (query: string) => void;
};

function Searchbar({ search, setSearch }: SearchbarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="w-full text-primary">
      <InputGroup className="bg-card shadow-sm py-2 sm:py-4">
        <InputGroupInput
          ref={inputRef}
          placeholder="Buscar..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}

export default Searchbar;
