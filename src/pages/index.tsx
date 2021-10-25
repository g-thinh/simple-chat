import { Container, Heading } from "@chakra-ui/react";
import Layout from "components/Layout";

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

HomePage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
