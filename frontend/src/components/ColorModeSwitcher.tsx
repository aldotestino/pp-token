import {
  useColorMode,
  SwitchProps,
  Switch, IconButton,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

type ColorModeSwitcherProps = Omit<SwitchProps, 'aria-label'>

function ColorModeSwitcher(props: ColorModeSwitcherProps) {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton aria-label='Toggle light dark mode' onClick={toggleColorMode} icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}/>
  );
}

export default ColorModeSwitcher;