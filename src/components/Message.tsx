import { Text, Box, useColorMode } from "@chakra-ui/react";
import { useAuth } from "contexts/AuthContext";

type MessageItem = {
  channelId?: string;
  createdBy?: string;
  insertedAt?: Date;
  message?: string;
};

export default function Message({ message, createdBy }: MessageItem) {
  const { user } = useAuth();
  const { colorMode } = useColorMode();
  const isUser = createdBy === user.uid;

  return isUser ? (
    <Box m={1}>
      <Text
        py={1}
        px={4}
        color="white"
        bg="teal.400"
        marginLeft="auto"
        sx={{
          width: "max-content",
          borderRadius: 30,
        }}
      >
        {message}
      </Text>
    </Box>
  ) : (
    <Box m={1}>
      <Text
        py={1}
        px={4}
        color={colorMode === "light" ? "black" : "white"}
        bg={colorMode === "light" ? "gray.300" : "gray.700"}
        marginLeft={isUser ? "auto" : undefined}
        sx={{
          width: "max-content",
          borderRadius: 30,
        }}
      >
        {message}
      </Text>
    </Box>
  );
}
