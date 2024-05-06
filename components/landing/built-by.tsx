import Link from "next/link";
import { FC } from "react";

import Typography from "../ui/typography";

export const BuiltBy: FC = () => (
  <Typography effect="tiny" className="text-center">
    Built with 🖤 by{" "}
    <Link
      href="https://github.com/mfbevan"
      target="_blank"
      className="underline"
    >
      mfbevan
    </Link>
  </Typography>
);
