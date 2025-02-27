import { useAppDispatch } from "@/app/store/hooks";
import navigationOptions from "../utils/navigationOptions";
import { loadNavOptionsActionCreator } from "@/app/store/features/navigation/navigation";
import { useCallback } from "react";

const useNavigation = () => {
  const dispatch = useAppDispatch();

  const loadOptionsNavigation = useCallback(() => {
    dispatch(loadNavOptionsActionCreator(navigationOptions));
  }, [dispatch]);

  return { loadOptionsNavigation };
};

export default useNavigation;
