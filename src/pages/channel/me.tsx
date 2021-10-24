import { Container, Flex, Heading } from "@chakra-ui/layout";
import LayoutDashboard from "components/LayoutDashboard";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import nookies from "nookies";
import { adminAuth } from "services/firebaseAdmin";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const cookies = nookies.get(context);
    const token = await adminAuth.verifyIdToken(cookies.token);

    return {
      props: { token },
    };
  } catch (error) {
    context.res.writeHead(302, { Location: "/login" }).end();
    return { props: {} };
  }
}

export default function Home(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  return (
    <LayoutDashboard>
      <Container h="100%">
        <Flex alignItems="center" justifyContent="center" h="100%">
          <Heading as="h2">No Chat</Heading>
        </Flex>
      </Container>
    </LayoutDashboard>
  );
}
