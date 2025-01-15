import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { Chain } from '@thirdweb-dev/chains';
import { formatEther } from 'ethers/lib/utils';
import Link from 'next/link';
import { FC } from 'react';

import { LinkedChainIcon } from '../chains';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { KeyValueTable } from '../ui/key-value-table';
import Typography from '../ui/typography';

import { createBlockLink } from '@/lib';
import { Block } from '@/server';

export interface BlockDetailsTableProps {
  chain: Chain;
  block: Block;
}

export const BlockDetailsTable: FC<BlockDetailsTableProps> = ({
  block,
  chain,
}) => (
  <Card>
    <KeyValueTable
      data={{
        'Block Height': <BlockHeight block={block} chain={chain} />,
        Chain: <LinkedChainIcon chain={chain} />,
        Timestamp: new Date(block.timestamp * 1000).toUTCString(),
        Hash: block.hash,
        ParentHash: block.parentHash,
        Miner: block.miner,
        Difficulty: block.difficulty,
        GasLimit: formatEther(block.gasLimit),
        GasUsed: formatEther(block.gasUsed),
        Transactions: block.transactions.length,
      }}
    />
  </Card>
);

const BlockHeight: FC<BlockDetailsTableProps> = ({ block, chain }) => (
  <div className='flex gap-2 item-center'>
    <Typography variant='p'>{block.number}</Typography>
    <Link href={createBlockLink({ chain, block: block.number - 1 })}>
      <Button size='small-icon' variant='outline'>
        <ChevronLeftIcon className='w-4 h-4' />
      </Button>
    </Link>
    <Link href={createBlockLink({ chain, block: block.number + 1 })}>
      <Button size='small-icon' variant='outline'>
        <ChevronRightIcon className='w-4 h-4' />
      </Button>
    </Link>
  </div>
);
