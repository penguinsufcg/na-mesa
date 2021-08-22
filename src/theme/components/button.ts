// Custom component theme example
// More info: https://chakra-ui.com/docs/theming/customize-theme#customizing-single-components

const ButtonStyle = {
  // style object for base or default style
  baseStyle: {
    fontFamily: 'body',
    borderRadius: '0.313rem',
    fontWeight: '500',
  },
  // styles for different sizes ("sm", "md", "lg")
  sizes: {
    xs: {
      fontSize: '0.75rem',
      h: '2rem',
      px: '1rem',
    },
    sm: {
      fontSize: '0.875rem',
      h: '2.5rem',
      px: '1rem',
    },
    md: {
      fontSize: '0.875rem',
      h: '3rem',
      px: '1rem',
    },
    lg: {
      fontSize: '0.875rem',
      h: '3.5rem',
      px: '1rem',
    },
  },
  // styles for different visual variants ("outline", "solid")
  variants: {
    primary: {
      margin: '0.5rem',
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
      margin: '0.5rem',
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
