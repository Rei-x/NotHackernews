import { Button, Col, Container, Input, Spacer, Text } from "@nextui-org/react";
import { useFormik } from "formik";
import React from "react";
import Layout from "../components/Layout";

const Submit = () => {
  const formik = useFormik({
    initialValues: {
      title: "",
      url: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <Layout>
      <Text h1 css={{ textAlign: "center" }}>
        Submit news
      </Text>
      <Spacer y={2} />
      <form onSubmit={formik.handleSubmit}>
        <Container
          display="flex"
          direction="column"
          justify="center"
          css={{ w: "50%", maxWidth: "20rem", p: "0" }}
        >
          <Input
            required
            id="title"
            name="title"
            label="Title"
            placeholder="Open-source firebase competitor"
            onChange={formik.handleChange}
            value={formik.values.title}
          />
          <Input
            required
            id="url"
            name="url"
            type="url"
            label="Url"
            placeholder="https://appwrite.io/"
            onChange={formik.handleChange}
            value={formik.values.url}
          />
          <Spacer y={1} />
          <Button type="submit" css={{ w: "5rem", mx: "auto" }}>
            Submit
          </Button>
        </Container>
      </form>
    </Layout>
  );
};

export default Submit;
