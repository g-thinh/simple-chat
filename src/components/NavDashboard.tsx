import {
  Button,
  Container,
  Flex,
  Grid,
  Heading,
  HStack,
  IconButton,
  useColorMode,
} from "@chakra-ui/react";
import Link from "components/Link";
import { FiMoon, FiSun } from "react-icons/fi";
import { signUserOut } from "utils/firebaseHelpers";
import ModalSettings from "./ModalSettings";

export default function NavDashboard() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Container maxW="100%" maxH="4.5rem" px={4} py={2}>
      <Flex sx={{ justifyContent: "space-between" }}>
        <Heading
          fontSize={[32, 36]}
          fontWeight="bold"
          href="/"
          sx={{
            ":hover": {
              textDecoration: "none",
              color: "teal.500",
            },
          }}
        >
          Simple Chat.
        </Heading>
        <Grid
          sx={{
            gridAutoFlow: "column",
            gap: 16,
            alignItems: "center",
          }}
        >
          <HStack spacing="16px">
            <ModalSettings />
            <IconButton
              aria-label="toggle dark/light mode"
              icon={
                colorMode === "light" ? (
                  <FiSun size={18} />
                ) : (
                  <FiMoon size={18} />
                )
              }
              onClick={toggleColorMode}
            />
            <Link as={Button} href="/channel/me">
              Chat
            </Link>
            <Button colorScheme="teal" onClick={signUserOut}>
              Log out
            </Button>
          </HStack>
        </Grid>
      </Flex>
    </Container>
  );
}
