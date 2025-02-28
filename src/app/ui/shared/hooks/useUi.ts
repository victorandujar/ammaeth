import { toggleMenuOpenActionCreator } from "@/app/store/features/ui/uiSlice";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { RootState } from "@/app/store/store";

const useUi = () => {
  const dispatch = useAppDispatch();
  const isNavigationMenuOpen = useAppSelector(
    (state: RootState) => state.ui.isNavigationMenuOpen,
  );

  const openNavigationMenu = () => {
    dispatch(toggleMenuOpenActionCreator(true));
  };

  const closeNavigationMenu = () => {
    dispatch(toggleMenuOpenActionCreator(false));
  };

  return {
    isNavigationMenuOpen,
    openNavigationMenu,
    closeNavigationMenu,
  };
};

export default useUi;
