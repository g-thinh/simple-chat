import {
  Avatar,
  Box,
  Button,
  Container,
  Flex,
  IconButton,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { FiSettings } from "react-icons/fi";
import { useAuth } from "contexts/AuthContext";
import { useRef } from "react";

export default function ModalSettings() {
  const { user } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = useRef(null);

  return (
    <>
      <IconButton
        aria-label="settings"
        icon={<FiSettings size={18} />}
        onClick={onOpen}
      />
      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          m={0}
          maxW="100%"
          sx={{
            borderRadius: 0,
            width: "100%",
            height: "100%",
            position: "fixed",
            top: 0,
            left: 0,
          }}
        >
          <ModalHeader textAlign="center">
            <Heading>Settings</Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody m={0} p={0}>
            <Container
              p={0}
              sx={{
                display: "flex",
                flexDirection: "column",
                border: "1px solid",
                borderColor: "gray.700",
                height: "100%",
                borderRadius: 12,
                overflow: "hidden",
              }}
            >
              <Box
                p={3}
                bg="cyan.700"
                height="6rem"
                sx={{
                  borderTopRadius: 12,
                  width: "100%",
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: "40%",
                    left: 0,
                    right: 0,
                    margin: "auto",
                    textAlign: "center",
                  }}
                >
                  {user && (
                    <>
                      <Avatar
                        name={user.email}
                        size="xl"
                        sx={{
                          border: "8px solid",
                          borderColor: "gray.800",
                        }}
                      />
                      <Heading mt={2} fontSize="xl">
                        {user.email}
                      </Heading>
                    </>
                  )}
                </Box>
              </Box>
              <Box
                bg="gray.900"
                p={3}
                sx={{
                  borderBottomRadius: 12,
                  height: "100%",
                }}
              >
                <Box
                  px={3}
                  pb={3}
                  pt="6rem"
                  sx={{ borderRadius: 12, height: "100%" }}
                >
                  <Box
                    bg="gray.800"
                    sx={{
                      borderRadius: 12,
                      height: "100%",
                    }}
                  >
                    <Flex justifyContent="space-between" p={4}>
                      <Flex flexDir="column">
                        <Text
                          color="gray.600"
                          fontSize="xs"
                          fontWeight="medium"
                        >
                          EMAIL
                        </Text>
                        {user && <Text>{user.email}</Text>}
                      </Flex>
                      <Button>Edit</Button>
                    </Flex>
                    <Flex justifyContent="space-between" p={4}>
                      <Flex flexDir="column">
                        <Text
                          color="gray.600"
                          fontSize="xs"
                          fontWeight="medium"
                        >
                          USERNAME
                        </Text>
                        <Text></Text>
                      </Flex>
                      <Button>Edit</Button>
                    </Flex>
                  </Box>
                </Box>
              </Box>
            </Container>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
