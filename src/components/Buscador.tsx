import {
  CheckIcon,
  CreditCardIcon,
  InfoIcon,
  MailIcon,
  SearchIcon,
  StarIcon,
} from "lucide-react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { useEffect, useState } from "react";

type BuscadorProps = {
  onSearch: (query: string) => void;
};

function Buscador({ onSearch }: BuscadorProps) {
  const [search, setSearch] = useState("");

  useEffect(() => {
    onSearch(search);
  }, [search]);

  return (
    <div className="md:absolute md:top-6 w-1/2 min-w-[250px] text-primary">
      <InputGroup className="bg-card shadow py-5">
        <InputGroupInput
          placeholder="Buscar evento..."
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

export default Buscador;
