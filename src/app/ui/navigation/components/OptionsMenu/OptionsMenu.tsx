"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useNavigation from "../../hooks/useNavigation";
import { useAppSelector } from "@/app/store/hooks";
import { useParams, usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

interface OptionsMenuProps {
  isOpen: boolean;
}

const menuVariants = {
  open: {
    height: "24rem",
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      duration: 1,
    },
  },
  closed: {
    height: 0,
    opacity: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      duration: 1,
    },
  },
};

const OptionsMenu: React.FC<OptionsMenuProps> = ({ isOpen }) => {
  const { loadOptionsNavigation } = useNavigation();
  const { options } = useAppSelector((state) => state.navigation);

  const router = useRouter();
  const path = usePathname();
  const { locale } = useParams();

  const initialLocale = Array.isArray(locale) ? locale[0] : locale || "EN";
  const [selected, setSelected] = useState<string>(initialLocale);
  const languageOptions = [
    { value: "en", label: "EN" },
    { value: "es", label: "ES" },
  ];

  const changePathLanguage = (path: string, targetLocale: string): string => {
    if (path.startsWith("/es")) {
      return path.replace("/es", `/${targetLocale}`);
    }
    if (path.startsWith("/en")) {
      return path.replace("/en", `/${targetLocale}`);
    }
    return `/${targetLocale}${path}`;
  };

  const handleLanguageChange = (language: string) => {
    const newPath = changePathLanguage(path!, language);
    setSelected(language);
    router.replace(newPath);
  };

  useEffect(() => {
    loadOptionsNavigation();
  }, [loadOptionsNavigation]);

  return (
    <motion.ul
      className="bg-gradient-to-b from-transparent to-white/20 backdrop-blur-xl flex flex-col justify-end items-end w-48 shadow-4xl z-10 p-5 rounded-br-lg rounded-bl-lg font-ppValve overflow-hidden text-ms"
      variants={menuVariants}
      initial="closed"
      animate={isOpen ? "open" : "closed"}
      exit="closed"
    >
      {options.map((option) => (
        <li key={option.id} className="font-thin tracking-wider">
          {option.text}
        </li>
      ))}
      <li className="flex gap-2">
        {languageOptions.map((option, index) => (
          <button
            onClick={() => handleLanguageChange(option.value)}
            key={option.label}
            className="flex items-center"
          >
            <span
              className={`${selected === option.value ? "text-primary" : ""}`}
            >
              {option.label}
            </span>
            {index < languageOptions.length - 1 && (
              <span className="ml-2">|</span>
            )}
          </button>
        ))}
      </li>
    </motion.ul>
  );
};

export default OptionsMenu;
