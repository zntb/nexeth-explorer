import { NextApiRequest } from "next";

import { logError } from "../errors";

export const errorMiddleware = ({
  error,
  req,
}: {
  error: any;
  req: NextApiRequest;
}) => {
  logError(req, error);
  return error;
};
