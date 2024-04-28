import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

import { Badge } from "../ui/badge";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dashboard } from "@/server";

export interface DashboardCardProps {
  dashboard: Dashboard;
}

export const DashboardCard: FC<DashboardCardProps> = ({
  dashboard: { name, description, tags, image, url },
}) => (
  <Link href={url} target="_blank">
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <AspectRatio ratio={16 / 9} className="mb-2 rounded-md overflow-hidden">
          <Image src={image} alt={name} className="object-cover" fill />
        </AspectRatio>

        {tags.map((tag) => (
          <Badge key={tag} variant="default" className={`mr-1 `}>
            {tag}
          </Badge>
        ))}

        <p className="text-xs text-muted-foreground pt-2">{description}</p>
      </CardContent>
    </Card>
  </Link>
);
