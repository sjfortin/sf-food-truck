import { Layout } from "@/components/Layout";
import Link from "next/link";

export default function Home() {
  return (
    <Layout>
      <h1 className="text-2xl font-bold">SF Food Truck Finder</h1>
      <Link
        className="underline hover:no-underline focus:no-underline"
        href="/food-trucks"
      >
        Food Trucks
      </Link>
    </Layout>
  );
}
