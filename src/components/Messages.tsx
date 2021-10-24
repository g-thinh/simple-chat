import { Box, Flex, Input } from "@chakra-ui/react";
import Message from "components/Message";
import { useAuth } from "contexts/AuthContext";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useStore, addMessage } from "utils/chatStore";

type MessageForm = {
  message: string;
};

export default function Messages() {
  const router = useRouter();
  const { user } = useAuth();
  const { slug } = router.query;
  const channelId = slug as string;
  const messagesEndRef = useRef(null);
  const { messages } = useStore(channelId);
  const { handleSubmit, register, reset } = useForm<MessageForm>();

  const onMessageSubmit = async ({ message }: MessageForm) => {
    addMessage(message, user, channelId);
    reset();
  };

  useEffect(() => {
    messagesEndRef.current.scrollIntoView({
      block: "start",
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <>
      <Flex sx={{ overflowY: "auto", flexDirection: "column", height: "100%" }}>
        {messages.map(({ message, createdBy }, index) => {
          return (
            <Message key={index} message={message} createdBy={createdBy} />
          );
        })}
        <Box ref={messagesEndRef} h={0} />
      </Flex>
      <Flex py={2} as="form" onSubmit={handleSubmit(onMessageSubmit)}>
        <Input
          sx={{ border: "1px solid", borderColor: "gray.700" }}
          type="text"
          placeholder="Type your message..."
          id="message"
          {...register("message")}
        />
      </Flex>
    </>
  );
}
