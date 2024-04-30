export const createBlockLink = ({
  chain,
  block,
}: {
  chain: string;
  block: number;
}) => `/block/${chain}/${block}`;

export const createTransactionLink = ({
  chain,
  hash,
}: {
  chain: string;
  hash: string;
}) => `/tx/${chain}/${hash}`;
