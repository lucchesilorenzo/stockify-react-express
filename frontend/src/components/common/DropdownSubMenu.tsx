import {
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "../ui/dropdown-menu";

type DropdownSubMenuProps = {
  menuTrigger: string;
  value: string;
  onValueChange: (value: string) => void;
  itemGroup: { label: string; value: string }[];
};

export default function DropdownSubMenu({
  menuTrigger,
  value,
  onValueChange,
  itemGroup,
}: DropdownSubMenuProps) {
  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>{menuTrigger}</DropdownMenuSubTrigger>
      <DropdownMenuSubContent>
        <DropdownMenuRadioGroup value={value} onValueChange={onValueChange}>
          {itemGroup.map((item) => (
            <DropdownMenuRadioItem key={item.value} value={item.value}>
              {item.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  );
}
