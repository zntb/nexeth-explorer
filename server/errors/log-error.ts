import { NextApiRequest } from "next";

/**
 * Throw a formatted error to the console, extracting useful information
 *
 * @param req The Next API Request
 * @param err The error object
 * @param status (optional) The status code to throw
 */
export const logError = async (
  req: NextApiRequest,
  err: any,
  status?: string | number
) => {
  const formattedError = {
    timestamp: new Date().toISOString(),
    call: req.url,
    method: req.method,
    query: req.query,
    body: JSON.stringify(req.body, null, 2),
    status: err.status ?? status ?? 500,
    message: err.message ?? err,
    cause: err.cause,
  };

  // eslint-disable-next-line no-console -- error logging
  console.error("An API Error Occurred", formattedError);
};
