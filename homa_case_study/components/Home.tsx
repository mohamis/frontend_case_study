import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Geoname, GeonamesRootObject } from "../utils/GeonameInterface";
import CardInformation from "./CardInformation";
import TableContinent from "./TableContinent";

export default function Home() {
  const [data, setData] = useState<GeonamesRootObject>(
    {} as GeonamesRootObject
  );
  const [continent, setContinent] = useState("ALL");
  const [metrics, setMetrics] = useState("ALL");
  const [total, setTotal] = useState(0);

  const fetchData = async () => {
    const response = await fetch("/api/hello");

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const result = await response.json();
    return setData(result);
  };

  function addNumbers(a: number, b: number) {
    return (a += b);
  }
  var sum: number = 0;

  useEffect(() => {
    if (data) {
      data.geonames?.forEach((a) => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        sum += addNumbers(+a.areaInSqKm, +a.population);
      });
      setTotal(sum);
    }
  }, [data]);

  return (
    <>
      <Container p={10} maxW={"4xl"}>
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 10, md: 26 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
            lineHeight={"110%"}
          >
            Use this app that fetches country data from GeoNames to plot and
            print a subset of it in a&nbsp;
            <Text as={"span"} color={"green.400"}>
              nice and friendly way!
            </Text>
          </Heading>
        </Stack>
        <HStack>
          <Box>
            <Menu closeOnSelect={false}>
              <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                Continent Names
              </MenuButton>
              <MenuList maxH={"300px"} overflow="scroll">
                <MenuItem
                  onClick={() => {
                    setContinent("ALL");
                  }}
                >
                  ALL
                </MenuItem>
                {data && data.geonames?.length > 0 ? (
                  <>
                    {data.geonames
                      ?.filter(
                        (element, i, arr) =>
                          arr.findIndex(
                            (t) => t.continentName === element.continentName
                          ) === i
                      )
                      .sort((a, b) =>
                        a.continentName.localeCompare(b.continentName)
                      )
                      .map((geoname, index) => (
                        <MenuItem
                          key={index}
                          value={geoname.capital}
                          onClick={() => {
                            setContinent(geoname.continentName);
                          }}
                        >{`${geoname.continentName}`}</MenuItem>
                      ))}
                  </>
                ) : null}
              </MenuList>
            </Menu>
          </Box>
          <Box>
            <Menu>
              <MenuButton
                isDisabled={data.geonames ? false : true}
                as={Button}
                rightIcon={<ChevronDownIcon />}
              >
                Metrics
              </MenuButton>
              <MenuList>
                <MenuItem
                  onClick={() => {
                    setMetrics("ALL");
                  }}
                >
                  ALL
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    setMetrics("areaInSqKm");
                  }}
                >
                  areaInSqKm
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    setMetrics("population");
                  }}
                >
                  population
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
          <Button
            cursor={"pointer"}
            colorScheme={"green"}
            bg={"green.400"}
            rounded={"full"}
            px={6}
            _hover={{
              bg: "green.500",
            }}
            onClick={fetchData}
          >
            Go
          </Button>
        </HStack>
        {data.geonames != undefined ? (
          <>
            <TableContinent
              data={data}
              continent={continent}
              metrics={metrics}
              total={total}
            />
          </>
        ) : (
          <CardInformation info={"The API was not yet triggered"} />
        )}
      </Container>
    </>
  );
}
