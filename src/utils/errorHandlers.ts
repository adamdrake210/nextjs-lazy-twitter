export const mapErrorFromBE = (error: any) => {
  console.error("Error: ", error.response);
  if (error?.response) {
    throw new Error(error.response);
  } else {
    throw new Error("Unknown error");
  }
};
