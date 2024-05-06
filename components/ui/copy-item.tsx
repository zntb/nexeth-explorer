import { CheckIcon, CopyIcon } from "@radix-ui/react-icons";
import { FC, ReactNode, useState } from "react";
import { toast } from "react-toastify";

export interface CopyItemProps {
  item?: string | number;
  children: ReactNode;
  withIcon?: boolean;
  withToast?: boolean;
}

export const CopyItem: FC<CopyItemProps> = ({
  item,
  children,
  withIcon = true,
  withToast = false,
}) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    if (!item) return;
    navigator.clipboard.writeText(item.toString());
    if (withToast) toast.info("Copied to clipboard");
    setIsCopied(true);
    setInterval(() => setIsCopied(false), 3000);
  };

  if (!withIcon) {
    return (
      <div
        className="flex flex-row gap-1 items-center hover:cursor-pointer"
        onClick={handleCopy}
      >
        {children}
      </div>
    );
  }

  return (
    <div className="flex flex-row gap-1 items-center" onClick={handleCopy}>
      {children}
      {isCopied ? (
        <CheckIcon className="opacity-50" />
      ) : (
        <CopyIcon className="opacity-50" />
      )}
    </div>
  );
};
