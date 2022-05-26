import { ReactNode } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Stack,
  Container,
  Avatar,
  useColorModeValue,
} from "@chakra-ui/react";

const Testimonial = ({ children }: { children: ReactNode }) => {
  return <Box>{children}</Box>;
};

const TestimonialContent = ({ children }: { children: ReactNode }) => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      boxShadow={"lg"}
      p={8}
      rounded={"xl"}
      align={"center"}
      pos={"relative"}
      _after={{
        content: `""`,
        w: 0,
        h: 0,
        borderLeft: "solid transparent",
        borderLeftWidth: 16,
        borderRight: "solid transparent",
        borderRightWidth: 16,
        borderTop: "solid",
        borderTopWidth: 16,
        borderTopColor: useColorModeValue("white", "gray.800"),
        pos: "absolute",
        bottom: "-16px",
        left: "50%",
        transform: "translateX(-50%)",
      }}
    >
      {children}
    </Stack>
  );
};

const TestimonialHeading = ({ children }: { children: ReactNode }) => {
  return (
    <Heading as={"h3"} fontSize={"xl"}>
      {children}
    </Heading>
  );
};

const TestimonialText = ({ children }: { children: ReactNode }) => {
  return (
    <Text
      textAlign={"center"}
      color={useColorModeValue("gray.600", "gray.400")}
      fontSize={"sm"}
    >
      {children}
    </Text>
  );
};

const TestimonialAvatar = ({
  src,
  name,
  title,
}: {
  src: string,
  name: string,
  title: string,
}) => {
  return (
    <Flex align={"center"} mt={8} direction={"column"}>
      <Avatar src={src} alt={name} mb={2} />
      <Stack spacing={-1} align={"center"}>
        <Text fontWeight={600}>{name}</Text>
        <Text fontSize={"sm"} color={useColorModeValue("gray.600", "gray.400")}>
          {title}
        </Text>
      </Stack>
    </Flex>
  );
};

export default function WithSpeechBubbles() {
  return (
    <Box bg={useColorModeValue("gray.100", "gray.700")}>
      <Container align={"center"} maxW={"7xl"} py={16} as={Stack} spacing={12}>
        <Stack spacing={0} align={"center"}>
          <Heading>FAQs</Heading>
        </Stack>
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={{ base: 10, md: 4, lg: 10 }}
        >
          <Testimonial>
            <TestimonialContent>
              <TestimonialHeading>
                <center>
                  How many tickets am I allowed to submit to the system?
                </center>
              </TestimonialHeading>
              <TestimonialText>
                When sending tickets, there is a strict one-at-a-time rule: once
                you've sent one, you can't send another until the first has been
                resolved.
              </TestimonialText>
            </TestimonialContent>
            <TestimonialAvatar />
          </Testimonial>

          <Testimonial>
            <TestimonialContent>
              <TestimonialHeading>
                <center>What if I have several issues?</center>
              </TestimonialHeading>
              <TestimonialText>
                If you're having multiple issues, submit a ticket and explain
                your issues in the comment section so the evaluator is fully
                aware of your situation. You may also include pictures to
                demonstrate your issues. If it isn't applicable, you can send
                another ticket after your initial one has been resolved or
                closed.
              </TestimonialText>
            </TestimonialContent>
            <TestimonialAvatar />
          </Testimonial>

          <Testimonial>
            <TestimonialContent>
              <TestimonialHeading>
                <center>What if my issue isn't resolved?</center>
              </TestimonialHeading>
              <TestimonialText>
                Once the evaluator submits a resolution to your filed issue, you
                are also allowed to reply that your problem still needs to be
                addressed. If the student is not satisfied with the resolution,
                the ticket should not be closed.
              </TestimonialText>
            </TestimonialContent>
            <TestimonialAvatar />
          </Testimonial>
        </Stack>

        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={{ base: 10, md: 4, lg: 10 }}
        >
          <Testimonial>
            <TestimonialContent>
              <TestimonialHeading>
                <center>How long does it take to get a ticket resolved?</center>
              </TestimonialHeading>
              <TestimonialText>
                The time it takes to resolve a ticket is determined by the
                nature of the issue and the availability of <br />
                evaluators or the admin; it could take up to 1-2 working days if
                there are available personnel who are <br />
                processing the pending requests.
              </TestimonialText>
            </TestimonialContent>
            <TestimonialAvatar />
          </Testimonial>

          <Testimonial>
            <TestimonialContent>
              <TestimonialHeading>
                <center>What if no specific ticket exists for my issue?</center>
              </TestimonialHeading>
              <TestimonialText>
                In the ticket area, there is an "other" option; select that
                option and then elaborate your problem in the comment section to
                thoroughly discuss your issue with the evaluator.
              </TestimonialText>
            </TestimonialContent>
            <TestimonialAvatar />
          </Testimonial>

          <Testimonial>
            <TestimonialContent>
              <TestimonialHeading>
                <center>
                  What if I have an issue but lack the necessary information to
                  submit a ticket?
                </center>
              </TestimonialHeading>
              <TestimonialText>
                Send your complaint to the local registrar by email them and
                wait for the response.
              </TestimonialText>
            </TestimonialContent>
            <TestimonialAvatar />
          </Testimonial>
        </Stack>

        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={{ base: 10, md: 4, lg: 10 }}
        >
          <Testimonial>
            <TestimonialContent>
              <TestimonialHeading>
                <center>
                  What if it takes so long to settle my submitted ticket?
                </center>
              </TestimonialHeading>
              <TestimonialText>
                Try waiting a little longer, and if that doesn't work, inform
                the local registrar about your filed ticket.
              </TestimonialText>
            </TestimonialContent>
            <TestimonialAvatar />
          </Testimonial>
        </Stack>
      </Container>
    </Box>
  );
}
