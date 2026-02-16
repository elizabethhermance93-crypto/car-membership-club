import Link, { LinkProps } from "next/link";
import { ReactNode } from "react";

type ButtonLinkProps = LinkProps & {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary";
};

export function ButtonLink({
  children,
  className = "",
  variant = "primary",
  ...props
}: ButtonLinkProps) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2a67ad]";

  const variantStyles =
    variant === "primary"
      ? "bg-[#2a67ad] text-white hover:bg-[#1f568f]"
      : "border border-[#2a67ad]/25 bg-white text-[#1f3553] hover:border-[#2a67ad]/50 hover:bg-[#f7faff]";

  return (
    <Link className={`${baseStyles} ${variantStyles} ${className}`} {...props}>
      {children}
    </Link>
  );
}
