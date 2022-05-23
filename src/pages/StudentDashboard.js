import { Box, Flex, Spacer, Text } from '@chakra-ui/react'
import React from 'react'

const StudentDashboard = () => {
  return (
    <Box>
      <Box bg='white' w='100%' borderRadius='lg'>
        <Text textAlign='center' size='2xl'>Hello, John Doe</Text>
      </Box>

      <Flex>
        <Box bg='white' w='100%' borderRadius='lg' p='3em'>
          <Text fontWeight='600'>Recent Ticket Info</Text>
          <Text>Ticket #2</Text>
            <Flex>
            <Text>Others</Text>
            <Spacer/>
            <Text>Close prompt</Text>
            </Flex>

            <Flex>
            <Text >Submitted on</Text>
            <Text>May 20, 2022</Text>
            <Spacer/>
            <Text>Last update on</Text>
            <Text>May 20, 2022</Text>
            </Flex>
        </Box>
        <Spacer />
        <Box bg='white' w='100%' borderRadius='lg'>

        </Box>
      </Flex>
    </Box>
  )
}

export default StudentDashboard