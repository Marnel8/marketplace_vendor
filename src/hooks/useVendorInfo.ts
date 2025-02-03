import api from "@/utils/api";
import { useQuery } from "@tanstack/react-query";

const getVendorInfo = async () => {
  try {
    const response = await api.get("/vendor/get-info");

    return response.data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const useGetVendorInfo = () => {
  return useQuery({
    queryKey: ["vendor"],
    queryFn: getVendorInfo,
  });
};
