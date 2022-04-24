import { Models } from "appwrite";
import React, { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import api from "../api";

const useCollectionList = <T>({
  collectionId,
  queries,
}: {
  collectionId: string;
  queries?: string[];
}) => {
  const queryString = `${collectionId}${JSON.stringify(queries)}`;

  const query = useQuery(queryString, async () => {
    return api
      .provider()
      .database.listDocuments<T & Models.Document>(collectionId, queries);
  });
  const client = useQueryClient();

  useEffect(() => {
    (async () => {
      try {
        await api.provider().account.getSessions();
      } catch {
        await api.provider().account.createAnonymousSession();
      }
    })();
  }, [collectionId]);

  useEffect(() => {
    return api
      .provider()
      .subscribe<T & Models.Document>(
        `collections.${collectionId}.documents`,
        (collectionData) => {
          if (collectionData.event === "database.documents.create") {
            client.setQueryData<Models.DocumentList<T & Models.Document>>(
              queryString,
              (prev) => ({
                ...prev!,
                documents: [...prev!.documents, collectionData.payload],
              })
            );
          }
          if (collectionData.event === "database.documents.update") {
            client.setQueryData<Models.DocumentList<T & Models.Document>>(
              queryString,
              (prev) => ({
                ...prev!,
                documents: prev!.documents.map((doc) =>
                  doc.$id === collectionData.payload.$id
                    ? collectionData.payload
                    : doc
                ),
              })
            );
          }
          if (collectionData.event === "database.documents.delete") {
            client.setQueryData<Models.DocumentList<T & Models.Document>>(
              queryString,
              (prev) => ({
                ...prev!,
                documents: prev!.documents.filter(
                  (doc) => doc.$id !== collectionData.payload.$id
                ),
              })
            );
          }
        }
      );
  }, [client, collectionId, queryString]);

  return query;
};

export default useCollectionList;
