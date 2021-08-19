import React from 'react'

const Header = ({ children }) => {

  return (
    <Box
      sx={{
        padding: 2,
        marginBottom: 2,
        width: '100%',
        maxWidth: '100%',
      }}
    >
      {children}
    </Box>
  )
}

export default Header