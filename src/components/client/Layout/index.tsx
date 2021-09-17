import { Flex } from '@chakra-ui/layout'
import { FC } from 'react'
import PageHeader from '../PageHeader'
import Footer from './components/Footer'

type Props = {
  headerProps: { title: string }
  footerProps: {
    value: number
    buttonProps: {
      label: string
      onClick: () => void
    }
  }
}

const Layout: FC<Props> = ({ headerProps, footerProps, children }) => {
  return (
    <Flex h="100vh" direction="column">
      <PageHeader title={headerProps.title} />
      {children}
      <Footer {...footerProps} />
    </Flex>
  )
}

export default Layout
