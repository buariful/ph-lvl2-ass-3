import { ZodError } from "zod";

const zodError = (error: ZodError) => {
  const errorFields: (string | number)[] = error?.issues?.map(
    (issue) => issue?.path[issue?.path?.length - 1]
  );

  return {
    statusCode: 400,
    message: "Validation Error",
    errorMessage: `${errorFields.join(", ")} ${errorFields?.length > 1 ? "fields are" : "field is"} required`,
  };
};

export const HandleErrors = {
  zodError,
};
