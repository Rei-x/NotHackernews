import { Models } from "appwrite";
import React, { useEffect, useState } from "react";
import api from "../api";

const useCollectionList = <T>({ collectionId }: { collectionId: string }) => {
  const [data, setData] = useState<Models.DocumentList<T & Models.Document>>();

  useEffect(() => {
    (async () => {
      try {
        await api.provider().account.getSessions();
      } catch {
        await api.provider().account.createAnonymousSession();
      }
      const apiData = await api
        .provider()
        .database.listDocuments<T & Models.Document>(collectionId);
      setData(apiData);
    })();
  }, [collectionId]);

  useEffect(() => {
    return api
      .provider()
      .subscribe<T & Models.Document>(
        `collections.${collectionId}.documents`,
        (collectionData) => {
          if (collectionData.event === "database.documents.create") {
            setData((prev) => ({
              ...prev!,
              documents: [...prev!.documents, collectionData.payload],
            }));
          }
          if (collectionData.event === "database.documents.update") {
            setData((prev) => ({
              ...prev!,
              documents: prev!.documents.map((doc) =>
                doc.$id === collectionData.payload.$id
                  ? collectionData.payload
                  : doc
              ),
            }));
          }
          if (collectionData.event === "database.documents.delete") {
            setData((prev) => ({
              ...prev!,
              documents: prev!.documents.filter(
                (doc) => doc.$id !== collectionData.payload.$id
              ),
            }));
          }
        }
      );
  }, [collectionId]);

  return [data, setData] as [
    Models.DocumentList<T & Models.Document> | undefined,
    React.Dispatch<
      React.SetStateAction<Models.DocumentList<T & Models.Document> | undefined>
    >
  ];
};

export default useCollectionList;
