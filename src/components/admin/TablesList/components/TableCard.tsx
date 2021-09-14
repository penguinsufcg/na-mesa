import React, { useState, useEffect } from 'react'
import { Box, Flex, Heading, Text, Spacer } from '@chakra-ui/react'
import { BiTimeFive } from 'react-icons/bi'
import TableDrawer from './TableDrawer'

const TableCard = ({ table }: { table : Table }) => {
  const [session, setSession] = useState<Session | null>()
  const { id, name, available, currentSession } = table
  const [isOpenDetails, setIsOpenDetails] = useState<boolean>(false)
  
  // useEffect(() => {
  //   if (!currentSession) {
  //     return
  //   }

  //   currentSession.firestore().then((e) => console.log(e))
  //   // // @ts-ignore
  //   // currentSession.get().then(snap => {
  //   //   console.log(snap)
  //   //   setSession(snap.data())
  //   // })
  //   // // @ts-ignore
  // }, [currentSession])
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
      }}>
        <Flex sx={{ alignItems: 'center' }}>
          <Text size="sm" maxW="175px" isTruncated>Mesa {name}</Text>
          <Spacer />
          <Text fontSize="xs" color="gray.500" orientation="horizontal" sx={{ marginRight: 1 }}>
            <BiTimeFive />
          </Text>
          <Text fontSize="xs" color="gray.500" orientation="horizontal">
            20:30
          </Text>
        </Flex>
        {!available  && (
          <Flex direction="column" fontSize="xs" color="gray.500">
            <Text> Cliente: Maria</Text>
            <Text> Total: R$ 00.00</Text>
          </Flex>
        )}
    </Box>
    <TableDrawer isOpen={isOpenDetails && !!table} onClose={() => setIsOpenDetails(false)} table={table} />
    </>
  )
}

export default TableCard