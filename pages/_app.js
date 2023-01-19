import Layout from "../components/layout/Layout";
import Head from "next/head";
import "../styles/globals.scss";

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <title>NextJs Events</title>
        <meta name="description" content="NextJs Events" />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}
