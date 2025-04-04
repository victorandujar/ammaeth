import Link from "next/link";
import { MdOutlineArrowOutward } from "react-icons/md";
import HoloAthomScene from "../HoloAthom/HoloAthom";
import routes from "../../utils/routes";

const StoreLink: React.FC = () => {
  return (
    <Link
      href={routes.store}
      className="flex items-center gap-2 text-xs 2xl:text-s relative"
    >
      <div className="w-10 h-40 absolute -left-10 ">
        <HoloAthomScene />
      </div>
      <span className="text-primary tracking-wider">
        ¿buscas inspiración para tu próximo proyecto? la encontrarás aquí
      </span>
      <MdOutlineArrowOutward color="var(--primary-color)" />
    </Link>
  );
};

export default StoreLink;
