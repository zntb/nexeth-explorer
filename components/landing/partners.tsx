import Image from "next/image";
import { FC } from "react";

import { Card } from "../ui/card";
import Typography from "../ui/typography";

const size = 100;

export const Partners: FC = () => (
  <div className="flex flex-col gap-4 text-center">
    <Typography effect="tiny">Powered by</Typography>
    <div className="flex flex-wrap justify-center gap-4">
      {partners.map((partner, index) => (
        <Card key={index} className="p-2 bg-white">
          <Image
            className="object-contain"
            src={partner}
            alt={`Partner ${index}`}
            width={size}
            height={size / 3}
            style={{ height: `${size / 3}px`, width: `${size}px` }}
          />
        </Card>
      ))}
    </div>
  </div>
);

const partners = [
  "https://etherscan.io/images/brandassets/etherscan-logo.svg",
  "https://assets-global.website-files.com/637232ff20f97141fc60d89c/6373de4372627430292985b2_logo.svg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvqIY-6OUUY6X5frYGjimelXzAzZ8yQR72egGaYBRp&s",
  "https://mma.prnewswire.com/media/1055937/Alchemy_Logo.jpg?p=facebook",
];
