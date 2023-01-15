import Layout from "../components/layout/Layout";
import "../styles/globals.scss";

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
