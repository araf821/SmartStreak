import { FC } from "react";

interface HeadingProps {
  title: string;
  description?: string;
}

const Heading: FC<HeadingProps> = ({ title, description }) => {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="font-semibold text-3xl md:text-4xl text-rose-500">
        {title}
      </h2>
      {description && <p>{description}</p>}
      <hr className="border-slate-700" />
    </div>
  );
};

export default Heading;
