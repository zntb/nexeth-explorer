import Link from "next/link";
import { FC, useMemo } from "react";

import { useMobileDesktop } from "../hooks";
import { Card } from "../ui/card";

import { createBlockLink } from "@/lib";
import { Block, BlockWithTransactions } from "@/server";

export interface BlockTimelineProps {
  latestBlock: Block | BlockWithTransactions;
  selectedBlock: Block | BlockWithTransactions;
  chain: string;
}

export const BlockTimeline: FC<BlockTimelineProps> = ({
  selectedBlock,
  chain,
}) => {
  const { length, number } = useMobileDesktop(
    { length: 3, number: 1 },
    { length: 7, number: 3 }
  );

  // plus two minus two
  const blocks = useMemo(
    () =>
      Array.from(
        { length },
        (_, index) => selectedBlock.number - number + index
      ),
    [length, number, selectedBlock.number]
  );

  const currentBlockIndex = blocks.findIndex(
    (block) => block === selectedBlock.number
  );

  // show 6 blocks total, 2 before, current, 2 after, latest
  return (
    <div className="flex items-center justify-center gap-4">
      {blocks.map((block, index) => (
        <Link href={createBlockLink({ block, chain })} key={block}>
          <Card
            key={block}
            className={`flex flex-col items-center p-2 hover:mb-4 transition-all ease  ${
              index === currentBlockIndex
                ? "mb-4"
                : `opacity-40 hover:opacity-100`
            }`}
          >
            <div className="text-sm text-gray-400">Block</div>
            <div className="text-lg font-bold">{block}</div>
          </Card>
        </Link>
      ))}
    </div>
  );
};
