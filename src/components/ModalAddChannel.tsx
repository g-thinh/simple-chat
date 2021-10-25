import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useAuth } from "contexts/AuthContext";
import { useForm } from "react-hook-form";
import { useChannels } from "hooks/useChannels";

type ChannelForm = {
  roomName: string;
};

export default function ModalAddChannel() {
  const { user } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { addChannel } = useChannels();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ChannelForm>();

  const createNewChannel = ({ roomName }: ChannelForm) => {
    addChannel(roomName, user);
    reset();
    onClose();
  };

  return (
    <>
      <Button mt={3} onClick={onOpen}>
        Add Channel
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(createNewChannel)}>
          <ModalHeader>Create a new Channel</ModalHeader>
          <ModalBody>
            <FormControl isInvalid={!!errors.roomName} mb={4}>
              <FormLabel>Channel Name</FormLabel>
              <Input
                autoFocus
                id="roomName"
                type="text"
                {...register("roomName", {
                  required: "This is required",
                })}
              />
              <FormErrorMessage>
                {errors.roomName && errors.roomName.message}
              </FormErrorMessage>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              type="submit"
              colorScheme="blue"
              isLoading={isSubmitting}
              mr={3}
            >
              Submit
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
