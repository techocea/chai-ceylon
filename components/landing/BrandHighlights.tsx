interface BrandHighlightsProps {
  title: string;
  description: string;
}

const BrandHighlights = ({ title, description }: BrandHighlightsProps) => {
  return (
    <section className="wrapper flex items-center justify-center">
      <div className="flex-center lg:max-w-lg w-full text-center">
        <h3 className="title">{title}</h3>
        <p className="text-muted-foreground font-medium">{description}</p>
      </div>
    </section>
  );
};

export default BrandHighlights;
