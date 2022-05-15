import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { 
    Stack, 
    AccordionPanel, 
    Box, 
    Center, 
    AccordionIcon,
    FormLabel,
    Button,
    Input,
    InputGroup,
    InputLeftElement,
    Accordion,
    AccordionItem,
    AccordionButton,} 
    from '@chakra-ui/react'

    import { BiSearchAlt } from "react-icons/bi";

import StudentLayout from "../../components/student/StudentLayout";

const HelpCenter = () => {
  return <StudentLayout>
    
    <Stack direction='row' h='100px' p={4}>
        <Box boxShadow='xs' p='6' rounded='md' bg='white' h='100vh' w='170vh'>

        <Center bg='orange.400' h='200px' color='white'>
            
            <Stack spacing={4}>
            <FormLabel fontSize='30px' ml='15'>What we can help you? </FormLabel>
            <InputGroup>
                <InputLeftElement
                pointerEvents='none'
                children={<BiSearchAlt color='orange' />}
                />
                <Input type='search' bg='#ffffff' placeholder='Search' _placeholder={{ opacity: 1, color: 'grey.200' }}/>
                <Button colorScheme='blue' size='md' w='100px' ml='5'>
                     Search
                </Button>
            </InputGroup>
            </Stack>
        </Center>
        <Box boxShadow='md' p='6' rounded='xs' 
        bg='white' h='50vh' w='162.5vh'>
            <Accordion>
                <AccordionItem>
                    <h2>
                    <AccordionButton>
                        <Box flex='1' textAlign='left'>
                        Section 1 title
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                    veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                    commodo consequat.
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                    <h2>
                    <AccordionButton>
                        <Box flex='1' textAlign='left'>
                        Section 1 title
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                    veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                    commodo consequat.
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
        </Box>
        
        </Box> 
    </Stack>
      
  </StudentLayout>;
};

export default HelpCenter;
