import { Slider } from "../ui/slider";
import { CONTENT } from "@/lib/constants";

export default async function ServicesSection() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE}/api/our-concepts`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return (
      <div className="text-center text-lg text-gray-500 py-10">
        Failed to load Concepts.
      </div>
    );
  }

  const { concepts = [] } = await res.json();


  return (
    <div className="wrapper pb-0">
      <Slider content={concepts} />
    </div>
  );
}
