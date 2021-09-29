import { Flex } from '@chakra-ui/layout'
import { FC } from 'react'
import PageHeader from '../PageHeader'
import Footer, { FooterProps } from './components/Footer'

type Props = {
  headerProps: { title: string }
  footerProps: FooterProps
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
