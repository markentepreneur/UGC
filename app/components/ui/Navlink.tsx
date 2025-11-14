"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import type { LinkProps } from "next/link";
import { ReactNode } from "react";

interface Props extends LinkProps {
  activeClassName?: string;
  passiveClassName?: string;
  className?: string;
  children: ReactNode;
}

const NavLink: React.FC<Props> = ({
  href,
  activeClassName,
  passiveClassName,
  children,
  className,
  ...args
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      {...args}
      className={`${className} ${
        isActive ? activeClassName || "" : passiveClassName || ""
      }`}
    >
      {children}
    </Link>
  );
};

export default NavLink;
