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
  placeholder: string;
};

function Searchbar({ search, setSearch, placeholder }: SearchbarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="w-full text-primary group/search">
      <InputGroup className="bg-card/80 backdrop-blur-sm shadow-sm py-2 sm:py-4 transition-all duration-300 ease-in-out border-transparent hover:border-border/50 has-[input:focus]:shadow-md has-[input:focus]:bg-card/95 has-[input:focus]:border-primary/50">
        <InputGroupInput
          ref={inputRef}
          className="placeholder:text-muted-foreground/50 transition-colors"
          placeholder={placeholder}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <InputGroupAddon className="transition-transform duration-300 group-has-[input:focus]/search:scale-110">
          <SearchIcon className="text-muted-foreground group-has-[input:focus]/search:text-primary transition-colors" />
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}

export default Searchbar;
