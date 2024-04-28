import Link from "next/link";
import { FC } from "react";

import { Button } from "../ui/button";

export interface PageErrorProps {
  statusCode: string | number;
  title: string;
  message: string;
  redirectUrl: string;
  redirectText: string;
}

export const PageError: FC<PageErrorProps> = ({
  statusCode,
  title,
  message,
  redirectUrl,
  redirectText,
}) => (
  <div className="flex items-center justify-center w-full min-h-[80vh] px-4 text-center">
    <div className="space-y-4">
      <h1 className="text-8xl font-extrabold tracking-tighter/tighter">
        {statusCode}
      </h1>
      <h2 className="text-4xl font-extrabold tracking-tight">{title}</h2>
      <p className="text-gray-500">{message}</p>
      <div className="flex justify-center">
        <Link href={redirectUrl}>
          <Button variant="outline">{redirectText}</Button>
        </Link>
      </div>
    </div>
  </div>
);
