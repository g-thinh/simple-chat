import { Container, Flex, Heading } from "@chakra-ui/layout";
import LayoutDashboard from "components/LayoutDashboard";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { adminAuth } from "services/firebaseAdmin";

export async function getServerSideProps({ req }: GetServerSidePropsContext) {
  try {
    const sessionCookie: string = req.cookies.session ?? "";
    const user = await adminAuth.verifySessionCookie(sessionCookie, true);
    return {
      props: { user },
    };
  } catch (error) {
    console.log("CATCH ERROR", error);
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
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
