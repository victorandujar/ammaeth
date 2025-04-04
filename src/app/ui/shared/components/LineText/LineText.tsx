import { GoDotFill } from "react-icons/go";

interface Props {
  text: string;
  color?: string;
}

const LineText: React.FC<Props> = ({ color, text }) => {
  return (
    <section className="flex items-center gap-2">
      <GoDotFill size={15} />
      <div className="border-b border-[1px] border-white w-56 scale-y-[0.25]" />
      <span
        style={{ color: color || "white" }}
        className="font-thin text-xs md:text-s"
      >
        {text}
      </span>
    </section>
  );
};

export default LineText;
