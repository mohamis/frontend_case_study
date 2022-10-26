import { InfoIcon } from "@chakra-ui/icons";
import {
  Flex,
  Stack,
  Heading,
  Text,
  Input,
  Button,
  Icon,
  useColorModeValue,
  createIcon,
  Box,
} from "@chakra-ui/react";

type InfoProps = {
  info: string;
};

export default function CardInformation(props: InfoProps) {
  const { info } = props;

  return (
    <Flex align={"center"} justify={"center"} py={12}>
      <Stack
        boxShadow={"2xl"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        p={10}
        spacing={8}
        align={"center"}
      >
        <Stack align={"center"} spacing={2}>
          <Box textAlign="center" py={10} px={6}>
            <InfoIcon boxSize={"50px"} color={"blue.500"} />
            <Heading as="h2" size="xl" mt={6} mb={2}>
              Information
            </Heading>
            <Text color={"gray.500"}>
              You need to press the Go button in order to get data. Once data is
              aggregated you will be able to see a table and a pie chart on the
              bottom of the screen.
            </Text>
          </Box>
        </Stack>
        <Stack spacing={4} direction={{ base: "column", md: "row" }} w={"full"}>
          {info ? (
            <Text
              h={"30px"}
              textAlign="center"
              color={"gray.800"}
              rounded={"full"}
              border={0}
              _focus={{
                bg: "gray.200",
                outline: "none",
              }}
            >
              More information: {info}
            </Text>
          ) : null}
        </Stack>
      </Stack>
    </Flex>
  );
}
