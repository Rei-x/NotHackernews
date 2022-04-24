import { Row, Text, Link } from "@nextui-org/react";
import { Query } from "appwrite";
import { formatDistance, formatDistanceStrict } from "date-fns";
import React from "react";
import { BiUpvote } from "react-icons/bi";
import config from "../config";
import useCollectionList from "../hooks/useCollection";
import { NewsModel } from "../models/news";

const News = ({ news, index }: { news: NewsModel; index: number; }) => {
  const commentsQuery = useCollectionList({
    collectionId: config.COMMENTS_COLLECTION_ID,
    queries: [Query.equal("newsId", news.$id)],
  });

  return (
    <div>
      {index}. <BiUpvote />{" "}
      <Link target="_blank" color="text" href={news.url}>
        {news.title}
      </Link>{" "}
      <Text small>
        <Link target="_blank" href={news.url}>
          ({new URL(news.url).hostname})
        </Link>
      </Text>
      <Row color="grey">
        <Text small color="grey">
          {news.upvotes} points by {news.authorName || "unknown"} |{" "}
          {news.createdAt &&
            formatDistanceStrict(news.createdAt * 1000, new Date(), {
              addSuffix: true,
            })}{" "}
          | {commentsQuery.data?.total || 0} comments
        </Text>
      </Row>
    </div>
  );
};

export default News;
