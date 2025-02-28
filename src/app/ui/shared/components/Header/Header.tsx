import colors from "../../utils/colors";
import LineText from "../LineText/LineText";
import useUi from "../../hooks/useUi";
import { useTranslations } from "next-intl";

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
    <header className="font-thin py-5 px-10 flex items-center justify-between w-full">
      <div className="w-1/3 flex items-center justify-between">
        <h2>ammaëth</h2>
        <LineText text="soul" color={colors.secondary} />
      </div>
      <button
        className="uppercase text-sm sm:text-base md:text-base"
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
