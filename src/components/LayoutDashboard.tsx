import { Box, Flex } from "@chakra-ui/react";
import Channels from "components/Channels";
import NavDashboard from "components/NavDashboard";

export default function LayoutDashboard({
  children,
}: React.PropsWithChildren<{}>) {
  return (
    <Box
      p={2}
      width="100%"
      height="100vh"
      flexDirection="column"
      sx={{
        display: "flex",
      }}
    >
      <NavDashboard />
      <Flex
        height="calc(100vh - 5rem)"
        flexDirection={{ sm: "column", md: "column", lg: "row" }}
      >
        <Flex
          mb={{ sm: 3, md: 3, lg: 0 }}
          mr={{ md: 0, lg: 3 }}
          p={3}
          sx={{
            border: "1px solid",
            borderColor: "gray.700",
            borderRadius: 12,
            width: { sm: "100%", md: "100%", lg: "30vw" },
            overflow: "auto",
            flexDirection: "column",
          }}
        >
          <Box h="100%">
            <Channels />
          </Box>
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
      </Flex>
    </Box>
  );
}
