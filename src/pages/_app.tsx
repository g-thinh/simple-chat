import { ChakraProvider, Progress } from "@chakra-ui/react";
import Layout from "components/Layout";
import { AuthProvider } from "contexts/AuthContext";
import useLoading from "hooks/useLoading";
import type { NextPage } from "next";
import { AppProps } from "next/app";
import theme from "styles/theme";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const { loading } = useLoading();
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <AuthProvider>
      <ChakraProvider theme={theme}>
        {loading && (
          <Progress
            colorScheme="teal"
            size="xs"
            isIndeterminate
            width="100%"
            sx={{ position: "fixed", top: 0, left: 0 }}
          />
        )}
        {getLayout(<Component {...pageProps} />)}
      </ChakraProvider>
    </AuthProvider>
  );
}

export default MyApp;
