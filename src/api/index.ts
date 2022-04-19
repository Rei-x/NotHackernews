import { Appwrite } from "appwrite";
import config from "../config";

const api = {
  sdk: null as null | Appwrite,
  provider: () => {
    if (api.sdk) {
      return api.sdk;
    };
    const appwrite = new Appwrite();
    appwrite.setEndpoint(config.ENDPOINT).setProject(config.PROJECT);
    api.sdk = appwrite;
    return appwrite;
  }
}

export default api;