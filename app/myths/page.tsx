import type { Metadata } from "next";
import MythsView from "../../components/MythsView";
import { getHomepage, getMyths } from "../../sanity/fetch";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Truth or trash: common gene myths",
  description:
    "An honest myth-buster for genetics. Eight common gene myths, each with a plain verdict and the actual truth - from 'genes are your destiny' to 'ancestry percentages are exact facts'.",
};

export default async function MythsPage() {
  const [myths, homepage] = await Promise.all([getMyths(), getHomepage()]);
  return <MythsView myths={myths} homepage={homepage} />;
}
