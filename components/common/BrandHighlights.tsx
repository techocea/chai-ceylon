import { CornerDownLeft } from "lucide-react";
import Heading from "./Heading";

interface BrandContentItem {
  id: number;
  title: string;
  points: string[];
}

interface BrandHighlightsProps {
  title: string;
  description: string;
  renderType: "about" | "services" | "vendor";
  content?: BrandContentItem[];
}

const BrandHighlights = ({
  title,
  description,
  renderType,
  content = [],
}: BrandHighlightsProps) => (
  <section className="flex-center mb-10">
    <div className="flex-center lg:max-w-lg w-full text-center">
      <Heading
        title={title}
        description={description}
        className="text-black"
      />
    </div>

    {renderType === "services" && (
      <div className="flex-center w-full">
        <div className="flex flex-col md:flex-row gap-16 lg:gap-24">
          {content.map((item) => (
            <div key={item.id}>
              <div className="flex flex-col items-start gap-4">
                <h3 className="text-lg text-secondary font-medium">
                  {item.title}
                </h3>
                <ul className="space-y-3">
                  {item.points.map((point, idx) => (
                    <li key={idx} className="flex gap-2">
                      <CornerDownLeft size={24} className="" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    )}
  </section>
);

export default BrandHighlights;
