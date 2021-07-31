// Custom component theme example
// More info: https://chakra-ui.com/docs/theming/customize-theme#customizing-single-components

const ButtonStyle = {
  // style object for base or default style
  baseStyle: {},
  // styles for different sizes ("sm", "md", "lg")
  sizes: {},
  // styles for different visual variants ("outline", "solid")
  variants: {
    primary: {
      bg: 'primary.500',
      color: 'white',
      _hover: {
        bg: 'primary.600',
      },
      _active: {
        bg: 'primary.300',
      },
    },
    secondary: {
      color: 'primary.500',
      border: '1px solid',
      borderColor: 'primary.500',
      _hover: {
        bg: 'primary.50',
      },
      _active: {
        bg: 'primary.100',
      },
    },
  },
  // default values for `size` and `variant`
  defaultProps: {
    size: 'md',
    variant: 'primary',
  },
}

export default ButtonStyle
