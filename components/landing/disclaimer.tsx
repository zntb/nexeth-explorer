import { IoWarning } from "react-icons/io5";

import { Card } from "../ui/card";
import Typography from "../ui/typography";

export const Disclaimer = () => (
  <Card className="p-2 flex flex-row gap-2 items-center max-w-lg mx-auto opacity-50">
    <IoWarning size={30} />
    <Typography className="text-left text-xs">
      Nexeth is currently in beta. Not all features are available yet. Please
      report any bugs or issues on our GitHub repository.
    </Typography>
  </Card>
);
