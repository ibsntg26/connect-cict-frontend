// import React, { useContext, useEffect, useState } from "react";
// import dayjs from "dayjs";
// import { Link } from "react-router-dom";

// import { BsForwardFill, BsCheckLg } from "react-icons/bs";

// import {
//   Flex,
//   Button,
//   Container,
//   Grid,
//   GridItem,
//   Center,
//   SimpleGrid,
//   Heading,
//   Box,
//   HStack,
//   VStack,
//   Stack,
//   Text,
//   Table,
//   Tab,
//   Tabs,
//   TabList,
//   TabPanels,
//   TabPanel,
//   Tooltip,
//   Divider,
//   Thead,
//   Tbody,
//   Tr,
//   Th,
//   Td,
//   Tag,
//   TagLabel,
//   TableCaption,
//   TableContainer,
//   useColorModeValue,
// } from "@chakra-ui/react";

// import UserLayout from "../../components/UserLayout";
// import TicketItem from "../../components/TicketItem";

// import AuthContext from "../../context/auth-context";
// import useAxios from "../../utils/axios";

// const Tickets = () => {
//   const [isLoading, setIsLoading] = useState(true);
//   const [tickets, setTickets] = useState([]);
//   const { canReport } = useContext(AuthContext);
//   const api = useAxios();

//   useEffect(() => {
//     document.title = "CONNECT | Tickets";
//     setIsLoading(true);
//     const getTickets = async () => {
//       const response = await api.get("/api/student-ticket/");
//       return response.data;
//     };
//     getTickets()
//       .then((res) => {
//         setTickets(res);
//         // console.log(res);
//       })
//       .catch((e) => {
//         alert(e.message);
//       });

//     setIsLoading(false);
//   }, []);

//   return (
//     <UserLayout>
//       <Grid maxH="95vh" p={3}>
//         <HStack w="full" spacing={2} align="flex-start">
//           <VStack align="flex-start" h="full" borderRight="2px solid #ddd">
//             <Box w={325} h="full" py={4}>
//               {/* w={325} or {40vh} */}
//               <Box px={4}>
//                 <Link to="/tickets/new">
//                   <Button colorScheme="orange" size="md" w="full">
//                     Open new ticket
//                   </Button>
//                 </Link>
//               </Box>
//               <Box mt={5}>
//                 <Tabs isFitted variant="enclosed" colorScheme="orange">
//                   <TabList mb="1em">
//                     <Tab>All Tickets</Tab>
//                     <Tab>My Tickets</Tab>
//                   </TabList>
//                   <TabPanels>
//                     <TabPanel px={0} py={0}>
//                       {/* <TicketItem
//                         id="1"
//                         label="Remaining balance"
//                         pic=""
//                         name="John Doe"
//                       /> */}

//                       {/* <TicketItem
//                         key={ticket.id}
//                         id={ticket.id}
//                         label={ticket.subject}
//                         pic=""
//                         name={ticket.student}
//                       /> */}

//                       {tickets.length > 0 ? (
//                         tickets.map((ticket) => (
//                           <TicketItem
//                             key={ticket.id}
//                             id={ticket.id}
//                             label={ticket.subject}
//                             // pic={""}
//                             {...ticket.student.account.map((account) => (
//                               name={account.first_name}
//                             ))}
//                             // name={ticket.student.account}
//                           />

//                           // console.log(ticket.student.account)
//                         ))
//                       ) : (
//                         <Text>No data.</Text>
//                       )}
//                     </TabPanel>
//                     <TabPanel>
//                       <p>My tixx</p>
//                     </TabPanel>
//                   </TabPanels>
//                 </Tabs>
//               </Box>
//             </Box>
//           </VStack>
//           <VStack w="full" h="full">
//             <Box h="full" w="full">
//               <Box w="full" p={8}>
//                 <Flex justifyContent="space-between">
//                   <Heading fontSize="2xl">Ticket #</Heading>
//                   <Box>
//                     <Tooltip hasArrow label="Forward to local registrar">
//                       <Button
//                         size="sm"
//                         fontSize="2xl"
//                         variant="ghost"
//                         color="gray.800"
//                         _hover={{
//                           color: "gray.600",
//                         }}
//                       >
//                         <BsForwardFill />
//                       </Button>
//                     </Tooltip>
//                     <Tooltip hasArrow label="Close report">
//                       <Button
//                         size="sm"
//                         fontSize="xl"
//                         variant="ghost"
//                         color="gray.800"
//                         _hover={{
//                           color: "gray.600",
//                         }}
//                       >
//                         <BsCheckLg />
//                       </Button>
//                     </Tooltip>
//                   </Box>
//                 </Flex>
//                 <SimpleGrid columns={3} gap={5} mt={5}>
//                   <Box>
//                     <Text fontSize="sm">Student</Text>
//                     <Text as="b" fontSize="large">
//                       John Doe
//                     </Text>
//                   </Box>
//                   <Box>
//                     <Text fontSize="sm">Evaluator</Text>
//                     <Text as="b" fontSize="large">
//                       Jane Doe
//                     </Text>
//                   </Box>
//                   <Box>
//                     <Text fontSize="sm">Date opened</Text>
//                     <Text as="b" fontSize="large">
//                       May 16, 2022
//                     </Text>
//                   </Box>
//                   <Box>
//                     <Text fontSize="sm">Status</Text>
//                     <Text>
//                       <Tag size="lg" colorScheme="orange" borderRadius="full">
//                         <TagLabel textTransform="capitalize">Open</TagLabel>
//                       </Tag>
//                     </Text>
//                   </Box>
//                   <Box>Tag</Box>
//                 </SimpleGrid>

//                 <Box w="full" mt={5}>
//                   <Text fontSize="sm">Description</Text>
//                   <Text fontWeight={600}>
//                     Lorem ipsum, dolor sit amet consectetur adipisicing elit.
//                     Dignissimos ad repellat illum quo nisi tempora molestias.
//                     Vero at quidem voluptas voluptates! Facere, a nesciunt!
//                     Cupiditate totam hic vero id rem!
//                   </Text>
//                 </Box>
//                 <Divider mt={8} />
//                 <Box h="full" w="full" mt={4}>
//                   Message goes here
//                 </Box>
//               </Box>
//             </Box>
//           </VStack>
//         </HStack>
//       </Grid>
//     </UserLayout>

//     // <UserLayout>
//     //   <Stack m={5} spacing={5}>
//     //     <Box
//     //       bg="white"
//     //       borderRadius="10px"
//     //       box-shadow="md"
//     //       padding={5}
//     //       lineHeight={1.25}
//     //     >
//     //       <Flex justifyContent="space-between">
//     //         <Heading fontSize="lg">My Help Tickets</Heading>
//     //         <Link to="/tickets/new">
//     //           {canReport == true && (
//     //             <Button size="sm" colorScheme="orange" variant="solid">
//     //               Open new ticket
//     //             </Button>
//     //           )}
//     //         </Link>
//     //       </Flex>
//     //       <TableContainer mt={8}>
//     //         <Table variant="simple">
//     //           {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
//     //           <Thead>
//     //             <Tr>
//     //               <Th>Subject</Th>
//     //               <Th>Concern</Th>
//     //               <Th>Status</Th>
//     //               <Th>Date opened</Th>
//     //               <Th>Date closed</Th>
//     //               <Th>Action</Th>
//     //             </Tr>
//     //           </Thead>
//     //           <Tbody>
//     //             {tickets.length > 0 ? (
//     //               tickets.map((ticket) => (
//     //                 <Tr key={ticket.id}>
//     //                   <Td>{ticket.subject}</Td>
//     //                   <Td>{ticket.message}</Td>
//     //                   <Td>

//     //                     {ticket.status === 'closed' ? (
//     //                       <Tag
//     //                         size="lg"
//     //                         colorScheme="green"
//     //                         borderRadius="full"
//     //                       >
//     //                         <TagLabel textTransform="capitalize">{ticket.status}</TagLabel>
//     //                       </Tag>
//     //                     ) : (
//     //                       <Tag size="lg" colorScheme="gray" borderRadius="full">
//     //                         <TagLabel textTransform="capitalize">{ticket.status}</TagLabel>
//     //                       </Tag>
//     //                     )}
//     //                   </Td>
//     //                   <Td>
//     //                     {dayjs(ticket.date_created).format(
//     //                       "MMMM D, YYYY h:mm a"
//     //                     )}
//     //                   </Td>
//     //                   <Td>
//     //                     {ticket.date_completed
//     //                       ? dayjs(ticket.date_completed).format(
//     //                           "MMMM D, YYYY h:mm a"
//     //                         )
//     //                       : "-"}
//     //                   </Td>
//     //                   <Td>
//     //                     <Link to={"/tickets/" + ticket.id}>
//     //                       <Text
//     //                         color="orange.400"
//     //                         _hover={{ color: "orange.300" }}
//     //                       >
//     //                         view
//     //                       </Text>
//     //                     </Link>
//     //                   </Td>
//     //                 </Tr>
//     //               ))
//     //             ) : (
//     //               <Tr><Td colSpan={6} textAlign="center">You haven't submitted any tickets yet.</Td></Tr>
//     //             )}
//     //           </Tbody>
//     //         </Table>
//     //       </TableContainer>
//     //     </Box>
//     //   </Stack>
//     // </UserLayout>
//   );
// };

// export default Tickets;
