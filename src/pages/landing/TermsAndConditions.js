import { ReactElement } from "react";
import {
  Box,
  SimpleGrid,
  Icon,
  Text,
  Stack,
  Heading,
  Flex,
  useColorModeValue,
  Container,
} from "@chakra-ui/react";
import {
  FcDataProtection,
  FcTreeStructure,
  FcConferenceCall,
  FcApproval,
  FcDataConfiguration,
  FcCollaboration,
} from "react-icons/fc";
import "./TermsAndConditions.css"

interface FeatureProps {
  title: string;
  text: string;
  icon: ReactElement;
}

const Feature = ({ title, text, icon }: FeatureProps) => {
  return (
    <Stack align="center">
      <Flex
        w={16}
        h={16}
        align={"center"}
        justify={"center"}
        color={"white"}
        rounded={"full"}
        bg={"gray.100"}
        mb={1}
      >
        {icon}
      </Flex>
      <Text fontWeight={600}>{title}</Text>
      <Text color={"gray.600"}>{text}</Text>
    </Stack>
  );
};

const Featuretwo = ({ text }: FeatureProps) => {
  return (
    <Stack>
      <Text color={"gray.600"}>{text}</Text>
    </Stack>
  );
};

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

export default function SimpleThreeColumns() {
  return (
    <div className="allcolor">
      <main>
        <br />
        <Heading fontSize={"3xl"}>Terms and Conditions</Heading>
        <br />
        <Container align={"center"} maxW={"7xl"} as={Stack}>
          <Stack spacing={0} align={"center"}></Stack>
          <Stack
            direction={{ base: "column", md: "row" }}
            spacing={{ base: 10, md: 4, lg: 10 }}
          >
            <Testimonial>
              <TestimonialContent>
                <TestimonialHeading>
                  <center>
                    In using this website you are considered to have read and
                    agreed to the following terms and conditions:
                  </center>
                </TestimonialHeading>
                <TestimonialText>
                  The following terminologies applies to these Terms and
                  Conditions, Privacy Statement and Disclaimer Notice and any or
                  all Agreements: “Client”, “You” and “Your” refers to you, the
                  person accessing this website and accepting the Company’s
                  terms and conditions. “The Company”, “Ourselves”, “We” and
                  “Us”, refers to our Company. “Party”, “Parties”, or “Us”,
                  refers to both the Client and ourselves, or either the Client
                  or ourselves. If you continue to browse and use this website,
                  you are agreeing to comply with and be bound by the following
                  terms and conditions of use, which together with our privacy
                  policy govern our relationship with you in relation to this
                  website. If you disagree with any part of these terms and
                  conditions, please do not use our website.
                </TestimonialText>
              </TestimonialContent>
            </Testimonial>
          </Stack>
        </Container>
        <br />

        <Box p={4}>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
            <Feature
              icon={<Icon as={FcDataProtection} w={10} h={10} />}
              title={"Privacy Statement"}
              text={
                "We are committed to protecting your privacy. Authorized users within the team on a need to know basis only use information collected from you. We constantly review our systems data to ensure the best possible services to our users. Parliament has created specific offences for unauthorized actions against computer systems and data. We will investigate any such actions with a view to prosecuting and/or taking civil proceedings to recover damages against those responsible."
              }
            />
            <Feature
              icon={<Icon as={FcTreeStructure} w={10} h={10} />}
              title={"Links to Third-Party Websites"}
              text={
                "From time to time, this website may also include links to other websites. These links are provided for your convenience to provide further information. They do not signify that we endorse the website/s. We have no responsibility for the content of the linked website/s."
              }
            />
            <Feature
              icon={<Icon as={FcApproval} w={10} h={10} />}
              title={"License"}
              text={
                "This website contains materials which is owned by or licensed to us. This material includes, but is not limited to, the design, layout, look, appearance, and graphics. Reproduction is prohibited other than in accordance with the copyright notice, which forms part of these terms and conditions."
              }
            />
          </SimpleGrid>
        </Box>

        <Box p={4}>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
            <Feature
              icon={<Icon as={FcDataConfiguration} w={10} h={10} />}
              title={"Usage"}
              text={
                "Your use of any information or materials on this website is entirely at your own risk, for which we shall not be liable. It shall be your own responsibility to ensure that any products, services or information available through this website meet your specific requirements."
              }
            />
            <Feature
              icon={<Icon as={FcCollaboration} w={10} h={10} />}
              title={"Conduct"}
              text={
                "You must be polite and respectful in every way possible. Sending tickets and email must be professionally written and don't use malicious or harmful contents. Any form of offensive contents will be immediately reported to the authorities. "
              }
            />
          </SimpleGrid>
        </Box>

        <Box p={4}>
          <SimpleGrid columns={{ base: 1, md: 1 }}>
            <Feature
              icon={<Icon as={FcConferenceCall} w={10} h={10} />}
              title={"Users"}
              text={
                "We want our users to be exclusive as possible to students, faculty and admin of Bulacan State University."
              }
            />
            <Featuretwo
              text={
                "So, we need you to commit to a few restrictions to use our website."
              }
            />
            <Featuretwo
              text={
                "1. You must be a registered student, faculty, admin or any associate inside the Bulacan State University"
              }
            />
            <Featuretwo
              text={
                "2. You must be currently studying in the university to be able to use the website, any accounts that are  "
              }
            />
            <Featuretwo
              text={"not associated with the university will be suspended. "}
            />
          </SimpleGrid>
        </Box>
      </main>
      <br />
    </div>
  );
}
