import mongoose from "mongoose";

import { MONGODB_URI } from "../../../lib/constants/server-env";
import { EnvironmentVariableMissing } from "../../../server/errors";

export const connect = async () => {
  if (!MONGODB_URI) throw EnvironmentVariableMissing("MONGODB_URI");
  return mongoose.connect(MONGODB_URI);
};
