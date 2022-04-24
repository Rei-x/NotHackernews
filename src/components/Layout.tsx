import { Container } from "@nextui-org/react";
import Head from "next/head";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container>
      <Head>
        <title>NotHackernews</title>
        <meta name="description" content="Clone of hackernews" />
        <link rel="icon" href="./favicon.ico" />
      </Head>
      {children}
    </Container>
  );
};

export default Layout;
