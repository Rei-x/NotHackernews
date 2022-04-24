import { Models } from "appwrite";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import api from "../api";

const useDocument = <T>({
  collectionId,
  documentId,
}: {
  collectionId: string;
  documentId: string;
}) => {
  const query = useQuery<T & Models.Document>(
    `${collectionId}.${documentId}`,
    async () => {
      return api
        .provider()
        .database.getDocument<T & Models.Document>(collectionId, documentId);
    }
  );
  return query;
};

export default useDocument;
