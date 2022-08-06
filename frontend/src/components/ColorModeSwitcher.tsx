import { useColorMode, SwitchProps, Switch } from '@chakra-ui/react';
import { useThemeColor } from '../store/themeStore';

type ColorModeSwitcherProps = Omit<SwitchProps, 'aria-label'>

function ColorModeSwitcher(props: ColorModeSwitcherProps) {
  const { colorMode, toggleColorMode } = useColorMode();
  const { themeColor } = useThemeColor();

  return (
    <Switch
      size="lg"
      isChecked={colorMode === 'dark' ? true : false}
      colorScheme={themeColor}
      onChange={toggleColorMode}
      {...props}
    />
  );
}

export default ColorModeSwitcher;