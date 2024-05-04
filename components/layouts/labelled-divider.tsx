import { FC } from "react";

import Typography from "../ui/typography";

export interface LabelledDividerProps {
  label: string;
  left?: boolean;
  right?: boolean;
}

export const LabelledDivider: FC<LabelledDividerProps> = ({
  label,
  left = true,
  right = true,
}) => (
  <div className="flex items-center gap-4">
    {left && <div className="flex-grow border-t border-muted" />}
    <Typography effect="muted">{label}</Typography>
    {right && <div className="flex-grow border-t border-muted" />}
  </div>
);
