import { IconButton, Menu, MenuButton, MenuDivider, MenuItem, MenuItemOption, MenuList, MenuOptionGroup, Text, Box, useColorMode, useColorModeValue, HStack } from '@chakra-ui/react';
import { ColorSwatchIcon } from '@heroicons/react/solid';
import ColorModeSwitcher from './ColorModeSwitcher';
import { ThemeColor, useThemeColor } from '../store/themeStore';

const themeOptions = Object.values(ThemeColor).map(c => ({
  label: c.charAt(0).toUpperCase() + c.slice(1), // capitalize first letter
  value: c
}));

function ThemeSelector() {

  const { themeColor, changeTheme } = useThemeColor();
  const gradient = useColorModeValue('500', '200');
  
  return (
    <Menu closeOnSelect={false}>
      <MenuButton as={IconButton} icon={<ColorSwatchIcon height="20" />} aria-label="theme selector" />
      <MenuList>
        <MenuItem justifyContent="space-between">
          <Text fontWeight="semibold" fontSize="sm">Mode</Text>
          <ColorModeSwitcher />
        </MenuItem>
        <MenuDivider />
        <MenuOptionGroup
          defaultValue={themeColor}
          title='Theme' 
          type='radio'
          onChange={e => changeTheme(e as ThemeColor)}
        >
          {themeOptions.map((to, i) => 
            <MenuItemOption key={i} value={to.value}>
              <HStack>
                <Box w="14px" h="14px" rounded="full" bg={`${to.value}.${gradient}`} />
                <Text>{to.label}</Text>
              </HStack>
            </MenuItemOption>
          )}
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
}

export default ThemeSelector;