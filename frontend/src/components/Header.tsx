import { Flex, Heading, useColorMode, useMediaQuery } from '@chakra-ui/react';
import { ConnectButton } from '@web3uikit/web3';
import { useThemeColor } from '../store/themeStore';
import ThemeSelector from './ThemeSelector';

function Header() {

  const [isLarger] = useMediaQuery('(min-width: 800px)');
  const { primaryColor } = useThemeColor();
  const { colorMode } = useColorMode();

  return (
    <Flex w="full" py={10} justify="space-between" align="center">
      <Heading color={primaryColor(colorMode)}>{isLarger ? 'PP Token Manager' : 'PP'}</Heading>
      <Flex align="center">
        <ConnectButton moralisAuth={false} />
        <ThemeSelector />
      </Flex>
    </Flex>
  );
}

export default Header;