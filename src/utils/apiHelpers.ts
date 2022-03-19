import axios, { AxiosResponse } from "axios";
import { mapErrorFromBE } from "./errorHandlers";

export const getDataFromApi = async (
  promise: Promise<AxiosResponse<any, any>>
) => {
  try {
    return await promise;
  } catch (error) {
    mapErrorFromBE(error);
  }
};

export const axiosCall = async (requestBody: any) => {
  const response = await getDataFromApi(
    axios({
      baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
      ...requestBody,
    })
  );
  return response.data;
};
