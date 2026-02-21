import Link from "next/link";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ href, children, className }, ref) => {
    return (
      <Link
        ref={ref}
        href={href}
        className={cn("transition hover:text-indigo-600", className)}
      >
        {children}
      </Link>
    );
  }
);

NavLink.displayName = "NavLink";

export default NavLink;