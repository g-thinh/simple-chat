import { Container, Heading } from "@chakra-ui/react";

export default function HomePage() {
  return (
    <Container maxW="100%">
      <Container m="auto" maxW="72rem">
        <Heading as="h1" mb={6} textAlign="center">
          Home Page
        </Heading>
      </Container>
    </Container>
  );
}
