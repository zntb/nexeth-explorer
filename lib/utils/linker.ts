export const createBlockLink = ({
  chain,
  block,
}: {
  chain: string;
  block: number;
}) => `/block/${chain}/${block}`;
