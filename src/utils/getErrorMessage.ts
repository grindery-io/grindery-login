export const getErrorMessage = (error: any) => {
  return (
    error?.response?.data?.error_description ||
    error?.response?.data?.error ||
    error?.response?.data?.message ||
    error?.message ||
    error ||
    "Unkown error"
  );
};
