// More info: https://chakra-ui.com/docs/theming/customize-theme#customizing-theme-tokens
import { extendTheme } from '@chakra-ui/react'

import colors from './colors'
import fonts from './font'
import components from './components'

const theme = extendTheme({
  colors,
  fonts,
  components,
})

export default theme
