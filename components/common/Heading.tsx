import { cn } from "@/lib/utils";

interface HeadingProps {
  title: string;
  description?: string;
  className?: string;
}

const Heading = ({ title, description, className }: HeadingProps) => {
  return (
    <div className={cn("flex-center text-center", className)}>
      <h3 className="title">{title}</h3>
      <p className="max-w-lg">{description}</p>
    </div>
  );
};

export default Heading;
