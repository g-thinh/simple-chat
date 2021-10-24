import LayoutDashboard from "components/LayoutDashboard";
import Messages from "components/Messages";
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

export default function Channels(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  return <Messages />;
}

Channels.getLayout = function getLayout(page: React.ReactElement) {
  return <LayoutDashboard>{page}</LayoutDashboard>;
};
