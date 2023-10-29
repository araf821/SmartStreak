"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";

interface NavLinkProps {
  href: string;
  name: string;
}

const NavLink: FC<NavLinkProps> = ({ href, name }) => {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={cn("lg:text-lg font-semibold tracking-wider relative", {
        "after:content-[''] after:w-full after:h-0.5 after:bg-rose-500 after:bottom-0 after:left-0 after:absolute":
          pathname === href,
      })}
    >
      {name}
    </Link>
  );
};

export default NavLink;
