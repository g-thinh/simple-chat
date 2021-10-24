import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Text,
  useColorMode,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import Channels from "components/Channels";
import ModalSettings from "components/ModalSettings";
import { signUserOut } from "utils/firebaseHelpers";
import { useAuth } from "contexts/AuthContext";
import React, { useRef } from "react";
import { FiMoon, FiSettings, FiSun } from "react-icons/fi";

export default function LayoutDashboard({
  children,
}: React.PropsWithChildren<{}>) {
  const { colorMode, toggleColorMode } = useColorMode();
  const { user } = useAuth();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const finalRef = useRef();

  return (
    <Box
      p={2}
      width="100%"
      flexDirection={{ sm: "column", md: "column", lg: "row" }}
      height="100vh"
      sx={{
        display: "flex",
        overflow: "hidden",
      }}
    >
      <Flex
        mb={{ sm: 3, md: 3, lg: 0 }}
        mr={{ md: 0, lg: 3 }}
        p={3}
        sx={{
          border: "1px solid",
          borderColor: "gray.700",
          borderRadius: 12,
          width: "30vw",
          overflow: "auto",
          flexDirection: "column",
        }}
      >
        <Box h="100%">
          <Channels />
        </Box>
        <VStack spacing="16px">
          <Flex alignItems="center">
            {user && (
              <>
                <Avatar name={user.displayName} />
                <Text ml={2}>{user.displayName}</Text>
              </>
            )}
          </Flex>
          <HStack spacing="12px">
            <IconButton
              aria-label="settings"
              icon={<FiSettings size={18} />}
              onClick={onOpen}
            />
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
            <Button colorScheme="teal" onClick={signUserOut}>
              Logout
            </Button>
            <ModalSettings
              finalFocusRef={finalRef}
              isOpen={isOpen}
              onClose={onClose}
            />
          </HStack>
        </VStack>
      </Flex>
      <Flex
        p={3}
        sx={{
          border: "1px solid",
          borderColor: "gray.700",
          borderRadius: 12,
          width: "100%",
          flexDirection: "column",
        }}
      >
        {children}
      </Flex>
    </Box>
  );
}
