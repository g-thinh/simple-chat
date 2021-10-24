import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  IconButton,
  List,
  ListItem,
} from "@chakra-ui/react";
import Link from "components/Link";
import ModalAddChannel from "components/ModalAddChannel";
import { useRouter } from "next/router";
import { FiX } from "react-icons/fi";
import { deleteChannel, useStore } from "utils/chatStore";

export default function Channels() {
  const router = useRouter();
  const { slug } = router.query;
  const { channels } = useStore(slug as string);

  return (
    <Accordion
      defaultIndex={[0]}
      allowMultiple
      sx={{
        width: "100%",
        height: "min-content",
      }}
    >
      <AccordionItem sx={{ border: "none" }}>
        <h2>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              Channels
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <List spacing={3}>
            <ListItem>
              <Link
                href={`/channel/me`}
                sx={{
                  display: "inline-flex",
                  width: "100%",
                  "&:hover": {
                    textDecoration: "none",
                    color: "teal.200",
                  },
                }}
              >
                Me
              </Link>
            </ListItem>
            {channels.map((channel) => {
              return (
                <ListItem key={channel.id} sx={{ display: "flex" }}>
                  <Link
                    href={`/channel/${channel.id}`}
                    sx={{
                      display: "inline-flex",
                      width: "100%",
                      "&:hover": {
                        textDecoration: "none",
                        color: "teal.200",
                      },
                    }}
                  >
                    {channel.roomName}
                  </Link>
                  <IconButton
                    background="none"
                    size="xs"
                    aria-label="delete channel"
                    icon={<FiX />}
                    onClick={() => deleteChannel(channel.id)}
                  />
                </ListItem>
              );
            })}
          </List>
          <ModalAddChannel />
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}
