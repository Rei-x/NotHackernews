import {
  Button,
  Checkbox,
  Col,
  Container,
  Input,
  Link,
  Row,
  Spacer,
  styled,
  Switch,
  Text,
} from "@nextui-org/react";
import { Models } from "appwrite";
import { motion } from "framer-motion";
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import api from "../api";
import config from "../config";
import useCollectionList from "../hooks/useCollection";
import { NewsModel } from "../models/news";
import { BiUpvote } from "react-icons/bi";
import News from "../components/News";
import Layout from "../components/Layout";

const Home: NextPage = () => {
  const newsQuery = useCollectionList<NewsModel>({
    collectionId: config.NEWS_COLLECTION_ID,
  });

  const createTodo = () => {
    api
      .provider()
      .database.createDocument<NewsModel>(
        config.NEWS_COLLECTION_ID,
        "unique()",
        {
          content: "",
          createdAt: Date.now(),
        }
      );
  };

  const updateTodo = async (id: string, isDone: boolean) => {
    await api
      .provider()
      .database.updateDocument(config.NEWS_COLLECTION_ID, id, { isDone });
  };

  const deleteTodo = async (id: string) => {
    await api.provider().database.deleteDocument(config.NEWS_COLLECTION_ID, id);
  };

  return (
    <Layout>
      <Container>
        <div>
          <h1>NotHackernews</h1>
        </div>
        <Container>
          {newsQuery.data?.documents.map((news, index) => (
            <News key={news.$id} news={news} index={index + 1} />
          ))}
        </Container>
      </Container>
    </Layout>
  );
};

export default Home;
