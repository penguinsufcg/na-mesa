import React, { useState, useEffect } from 'react'
import { Box, Flex, Heading, Text, Spacer } from '@chakra-ui/react'
import { BiTimeFive } from 'react-icons/bi'
import TableDrawer from './TableDrawer'
import { useFirestoreListQuery } from '@/hooks/useFirestoreListQuery'

const TableCard = ({ table }: { table: Table }) => {
  const [session, setSession] = useState<Session | null>()
  const { id, name, available, currentSession } = table
  const [isOpenDetails, setIsOpenDetails] = useState<boolean>(false)
  const { data: ordersData, isLoading } = useFirestoreListQuery<Order>(
    'orders',
    { where: ['session', '==', currentSession] },
    [currentSession],
  )

  // console.log(currentSession)
  useEffect(() => {
    if (
      !currentSession ||
      typeof currentSession === 'string' ||
      currentSession === null
    ) {
      return
    }
    // @ts-ignore
    currentSession?.get().then((s) => setSession(s.data()))
  }, [currentSession])

  if (isLoading) {
    return <Text>Loading...</Text>
  }
  return (
    <>
      <Box
        onClick={() => setIsOpenDetails(true)}
        sx={{
          width: '250px',
          height: '110px',
          borderWidth: '1px',
          borderRadius: 'lg',
          overflow: 'hidden',
          padding: 2,
          _hover: {
            cursor: 'pointer',
          },
        }}>
        <Flex sx={{ alignItems: 'center' }}>
          <Text size="sm" maxW="175px" isTruncated>
            Mesa {name}
          </Text>
          <Spacer />
          <Text
            fontSize="xs"
            color="gray.500"
            orientation="horizontal"
            sx={{ marginRight: 1 }}>
            <BiTimeFive />
          </Text>
          <Text fontSize="xs" color="gray.500" orientation="horizontal">
            20:30
          </Text>
        </Flex>
        {session && (
          <Flex direction="column" fontSize="xs" color="gray.500">
            <Text> Cliente: {session?.client}</Text>
            <Text> Total: R$ 00.00</Text>
          </Flex>
        )}
      </Box>
      <TableDrawer
        isOpen={isOpenDetails && !!table}
        onClose={() => setIsOpenDetails(false)}
        table={table}
        sessionRef={currentSession}
        session={session}
      />
    </>
  )
}

export default TableCard
