"use client";
import Container from "../Container";

import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import { GiIsland, GiWindmill } from "react-icons/gi";
import { MdOutlineVilla } from "react-icons/md";
import CategoryBox from "../CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";

export const categories = [
  {
    label: "Beach",
    icon: TbBeach,
    description: "This property is close to Beach",
  },
  {
    label: "Windmills",
    icon: GiWindmill,
    description: "This property is close to Windmills",
  },
  {
    label: "Modern",
    icon: MdOutlineVilla,
    description: "This is a Villa",
  },
  {
    label: "CountrySide",
    icon: TbMountain,
    description: "This is a in countryside",
  },
  {
    label: "Pools",
    icon: TbPool,
    description: "This property has Pool",
  },
  {
    label: "Islands",
    icon: GiIsland,
    description: "This property is on an island",
  },
];

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname();

  const isMainPage = pathname == "/";

  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div
        className="  
        pt-4
        flex
        flex-row
        items-center
        justify-between
        overflow-x-axis
      "
      >
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            selected={category == item.label}
            icon={item.icon}
          />
        ))}
      </div>
    </Container>
  );
};
export default Categories;
