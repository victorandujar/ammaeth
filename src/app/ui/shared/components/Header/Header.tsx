"use client";

import LineText from "../LineText/LineText";
import Link from "next/link";
import routes from "../../utils/routes";
import Image from "next/image";
import { useAppSelector } from "@/app/store/hooks";
import { useState, useEffect } from "react";
import StoreLink from "../StoreLink/StoreLink";
import { useParams, usePathname } from "next/navigation";

const Header: React.FC = () => {
  const { headerColor, headerText } = useAppSelector((state) => state.ui);
  const [currentTime, setCurrentTime] = useState(new Date());
  const path = usePathname();
  const { locale } = useParams();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-transparent backdrop-blur-lg flex items-center justify-between p-4 pr-8 mobile:w-full">
      <div className="w-full md:w-1/3 flex items-center justify-between">
        <Link href={routes.home}>
          <Image
            src={"/icons/ae-logo.svg"}
            alt="ammaeth logo"
            width={60}
            height={60}
          />
        </Link>
        <LineText text={headerText} color={headerColor} />
      </div>
      {path !== `/${locale}${routes.store}` && <StoreLink />}
      <div className="hidden md:flex gap-2 font-thin text-s">
        <span>Barcelona</span>
        <span>
          {currentTime.toLocaleString("es-ES", {
            dateStyle: "medium",
            timeStyle: "medium",
          })}
        </span>
      </div>
    </header>
  );
};

export default Header;
