import { ExternalLinkIcon, MoonIcon, SunIcon } from '@radix-ui/react-icons';
import {
  isEnsName,
  useDisconnect,
  useSetIsWalletModalOpen,
} from '@thirdweb-dev/react';
import { isAddress } from 'ethers/lib/utils';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import { FC, useEffect, useMemo } from 'react';
import { FaGlobe, FaWallet } from 'react-icons/fa';

import { ChainIcon } from '../chains';
import { useSession } from '../hooks';
import { CommandItem } from '../ui/command';
import { Skeleton } from '../ui/skeleton';

import { useCommandPaletteStore as useCommandPalette } from './command-palette-store';
import { CommandProps, navigationCommands } from './commands';

import { isIpfsSearch, isTransactionHash, slugToChain } from '@/lib';
import { trpc } from '@/server';

export const useCommands = () => {
  const { setTheme } = useTheme();
  const onWalletOpen = useSetIsWalletModalOpen();
  const onDisconnect = useDisconnect();
  const { isConnected } = useSession();
  const { query } = useCommandPalette();

  const isSearchable = useMemo(
    () =>
      isAddress(query) ||
      isTransactionHash(query) ||
      isEnsName(query) ||
      isIpfsSearch(query),
    [query],
  );

  const { data = { results: [] }, isFetching } = trpc.search.get.useQuery(
    { query },
    {
      keepPreviousData: false,
      enabled: isSearchable,
    },
  );

  const navigation = useMemo(() => toCommands(navigationCommands), []);

  const search = useMemo(() => {
    if (!isSearchable) return [];
    if (isFetching) {
      return [
        <CommandItem key='loading-search-results' value={query}>
          <Skeleton className='w-full h-5' />
        </CommandItem>,
      ];
    }
    if (data.results.length > 0) {
      return toCommands(
        data.results.map(result => ({
          icon: <FaGlobe />,
          ...result,
        })),
        true,
      );
    }
    return [
      <CommandItem key='loading-search-results' value={query}>
        No results found.
      </CommandItem>,
    ];
  }, [data.results, isFetching, isSearchable, query]);

  const wallet = useMemo(
    () =>
      toCommands(
        isConnected
          ? [
              {
                title: 'Disconnect Wallet',
                icon: <FaWallet />,
                callback: () => onDisconnect(),
              },
            ]
          : [
              {
                title: 'Connect Wallet',
                icon: <FaWallet />,
                callback: () => onWalletOpen(true),
              },
            ],
      ),
    [isConnected, onDisconnect, onWalletOpen],
  );

  const theme = toCommands([
    {
      title: 'Light Theme',
      icon: <SunIcon />,
      callback: () => setTheme('light'),
    },
    {
      title: 'Dark Theme',
      icon: <MoonIcon />,
      callback: () => setTheme('dark'),
    },
    {
      title: 'System Theme',
      icon: <MoonIcon />,
      callback: () => setTheme('system'),
    },
  ]);

  return {
    navigation,
    theme,
    wallet,
    search,
  };
};

const toCommands = (commands: CommandProps[], prefetch: boolean = false) =>
  commands.map(command => (
    <Command key={command.title} {...command} prefetch={prefetch} />
  ));

const Command: FC<CommandProps & { prefetch?: boolean }> = ({
  title,
  href,
  icon,
  callback,
  chain,
  prefetch = false,
  external,
}) => {
  const router = useRouter();
  const { onClose, setQuery } = useCommandPalette();

  useEffect(() => {
    if (prefetch && href?.startsWith('/')) router.prefetch(href);
  }, [href, prefetch, router]);

  const onCommand = () => {
    onClose();
    setQuery('');
    if (href) {
      if (external) return window.open(href, '_blank');
      router.push(href);
    }
    if (callback) callback();
  };

  return (
    <CommandItem
      className='flex items-center gap-2'
      key={title}
      value={`${title} ${href}`}
      onSelect={onCommand}
    >
      {chain ? <ChainIcon chain={slugToChain(chain)} size={20} /> : icon}
      <span>{title}</span>
      <div className='flex-1' />
      {external && <ExternalLinkIcon />}
    </CommandItem>
  );
};
