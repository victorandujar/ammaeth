import { loadServicesActionCreator } from "@/app/store/features/services/servicesSlice";
import { useAppDispatch } from "@/app/store/hooks";
import services from "../utils/services";
import { useCallback } from "react";

const useServices = () => {
  const dispatch = useAppDispatch();

  const loadServices = useCallback(() => {
    dispatch(loadServicesActionCreator(services));
  }, [dispatch]);

  return { loadServices };
};

export default useServices;
