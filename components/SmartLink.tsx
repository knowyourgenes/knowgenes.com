import Link from "next/link";
import type { ComponentProps } from "react";

type Props = { href: string } & Omit<ComponentProps<"a">, "href">;

/**
 * Renders a native <a> for in-page anchor links (any href containing "#") and a
 * Next <Link> for real route navigations.
 *
 * Next's <Link> resolves "/#section" against the current URL - when that URL
 * already ends in a hash, it appends, stacking "#section#section" on repeat
 * clicks. A native anchor resolves the fragment idempotently and the smooth
 * scroll still works via `scroll-behavior: smooth` in globals.css.
 */
export default function SmartLink({ href, ...props }: Props) {
  if (href.includes("#")) return <a href={href} {...props} />;
  return <Link href={href} {...props} />;
}
