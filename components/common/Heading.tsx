interface HeadingProps {
  title: string | undefined;
  description: string | undefined;
}

const Heading = ({ title, description }: HeadingProps) => {
  return (
    <div className="flex-center text-center">
      <h3 className="title">{title}</h3>
      <p className="sub-heading max-w-lg">{description}</p>
    </div>
  );
};

export default Heading;
