import create from 'zustand';
import shallow from 'zustand/shallow';
import { persist } from 'zustand/middleware';

export enum ThemeColor {
  RED = 'red',
  ORANGE = 'orange',
  YELLOW = 'yellow',
  GREEN = 'green',
  TEAL = 'teal',
  BLUE = 'blue',
  CYAN = 'cyan',
  PURPLE = 'purple',
  PINK = 'pink'
}

interface ThemeColorStore {
  themeColor: ThemeColor,
  primaryColor: (mode: 'light' | 'dark') => string
  changeTheme: (_theme: ThemeColor) => void
}

const useStore = create<ThemeColorStore>()(
  persist(
    (set, get) => ({
      themeColor: ThemeColor.PINK,
      primaryColor: (mode) => `${get().themeColor}.${mode === 'light' ? '500' : '200'}`,
      changeTheme: (_themeColor) => set({ themeColor: _themeColor }),
    }),
    {
      name: 'theme-color',
      partialize: (state) => ({ themeColor: state.themeColor }),
    }
  )
);

export function useThemeColor() {
  return useStore(({ themeColor, primaryColor, changeTheme }) => ({ themeColor, primaryColor, changeTheme }), shallow);
}