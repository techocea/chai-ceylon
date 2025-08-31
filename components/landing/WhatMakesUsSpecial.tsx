interface WhatMakesUsSpecialProps {
  title: string;
  content: string[];
}

const WhatMakesUsSpecial = ({ title, content }: WhatMakesUsSpecialProps) => {
  return (
    <section className="wrapper">
      <div>
        <h3 className="title">{title}</h3>
        <div className="my-6">
          <ul className="space-y-3 px-4">
            {content.map((item, idx) => {
              const [highlight, rest] = item.split(":");
              return (
                <li
                  key={idx}
                  className="text-base text-muted-foreground list-disc"
                >
                  <span className="font-semibold">{highlight}:</span>
                  <span className="ml-2">{rest.trim()}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default WhatMakesUsSpecial;
