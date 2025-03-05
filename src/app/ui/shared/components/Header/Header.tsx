import colors from "../../utils/colors";
import LineText from "../LineText/LineText";
import useUi from "../../hooks/useUi";
import { useTranslations } from "next-intl";
import Link from "next/link";
import routes from "../../utils/routes";
import Image from "next/image";

const Header: React.FC = () => {
  const t = useTranslations("Landing");

  const { openNavigationMenu, closeNavigationMenu, isNavigationMenuOpen } =
    useUi();
  const toggleNavigationMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (isNavigationMenuOpen) {
      closeNavigationMenu();
    } else {
      openNavigationMenu();
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-transparent backdrop-blur-lg flex items-center justify-between p-4 pr-8 mobile:w-full">
      <div className="w-1/3 flex items-center justify-between">
        <Link href={routes.home}>
          <Image
            src={"/icons/ae-logo.svg"}
            alt="ammaeth logo"
            width={60}
            height={60}
          />
        </Link>
        <LineText text="soul" color={colors.secondary} />
      </div>
      <button
        className="uppercase text-sm sm:text-base md:text-base z-20"
        onMouseEnter={openNavigationMenu}
        onMouseLeave={closeNavigationMenu}
        onClick={toggleNavigationMenu}
      >
        {t("options")}
      </button>
    </header>
  );
};

export default Header;
