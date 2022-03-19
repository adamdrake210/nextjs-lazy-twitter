import { mapErrorFromBE } from "./errorHandlers";

export const getDataFromApi = async (promise: Promise<any>) => {
  try {
    const response = await promise;
    return response.data;
  } catch (error) {
    mapErrorFromBE(error);
  }
};
