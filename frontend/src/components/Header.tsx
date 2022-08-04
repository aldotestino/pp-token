import { Flex, Heading, useMediaQuery } from '@chakra-ui/react';
import { ConnectButton } from '@web3uikit/web3';
import ColorModeSwitcher from './ColorModeSwitcher';
import { primaryColor } from '../theme';

function Header() {

  const [isLarger] = useMediaQuery('(min-width: 800px)');

  return (
    <Flex w="full" py={10} justify="space-between" align="center">
      <Heading color={primaryColor}>{isLarger ? 'PP Token Manager' : 'PP'}</Heading>
      <Flex align="center">
        <ConnectButton moralisAuth={false} />
        <ColorModeSwitcher />
      </Flex>
    </Flex>
  );
}

export default Header;