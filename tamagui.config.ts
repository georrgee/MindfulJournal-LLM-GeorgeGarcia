import { config } from '@tamagui/config/v3'
import { createTamagui } from '@tamagui/core'

const appConfig = createTamagui({
  ...config,
  themes: {
    ...config.themes,
    light: {
      ...config.themes.light,
      background: '#ffffff',
      backgroundHover: '#f5f5f5',
      backgroundPress: '#eeeeee',
      backgroundFocus: '#f0f0f0',
      color: '#000000',
      colorHover: '#333333',
      colorPress: '#666666',
      colorFocus: '#444444',
      borderColor: '#e0e0e0',
      shadowColor: '#00000020',
    },
    dark: {
      ...config.themes.dark,
      background: '#000000',
      backgroundHover: '#1a1a1a',
      backgroundPress: '#2a2a2a',
      backgroundFocus: '#1f1f1f',
      color: '#ffffff',
      colorHover: '#cccccc',
      colorPress: '#999999',
      colorFocus: '#bbbbbb',
      borderColor: '#333333',
      shadowColor: '#ffffff20',
    },
  },
})

export default appConfig

export type Conf = typeof appConfig

declare module '@tamagui/core' {
  interface TamaguiCustomConfig extends Conf { }
}