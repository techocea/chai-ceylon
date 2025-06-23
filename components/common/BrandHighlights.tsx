import { CornerDownLeft } from "lucide-react";

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
  <section className="wrapper flex-center">
    <div className="flex-center lg:max-w-lg w-full text-center">
      <h3 className="title">{title}</h3>
      <p className="text-muted-foreground font-medium">{description}</p>
    </div>

    {renderType === "services" && (
      <div className="flex-center w-full mt-28 lg:mt-32">
        <div className="flex flex-col md:flex-row gap-16 lg:gap-24">
          {content.map((item) => (
            <div key={item.id}>
              <div className="flex flex-col items-start gap-4">
                <h3 className="text-lg text-secondary font-medium">{item.title}</h3>
                <ul className="space-y-3">
                  {item.points.map((point, idx) => (
                    <li key={idx} className="flex gap-2">
                      <CornerDownLeft size={24} className=""/>
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
