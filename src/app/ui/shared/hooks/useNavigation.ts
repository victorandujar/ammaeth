import { useAppDispatch } from "@/app/store/hooks";
import { loadNavOptionsActionCreator } from "@/app/store/features/navigation/navigationSlice";
import { useCallback } from "react";
import navigationOptions from "../utils/navigationOptions";

const useNavigation = () => {
  const dispatch = useAppDispatch();

  const loadOptionsNavigation = useCallback(() => {
    dispatch(loadNavOptionsActionCreator(navigationOptions));
  }, [dispatch]);

  return { loadOptionsNavigation };
};

export default useNavigation;
