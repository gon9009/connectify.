import { Client, Account, Databases, Storage, Avatars } from "appwrite";

// 환경변수 타입 정의 
interface AppwriteConfig {
  url: string;
  projectId: string;
  databaseId: string;
  storageId: string;
  userCollectionId: string;
  postCollectionId: string;
  savesCollectionId: string;
}

export const appwriteConfig :AppwriteConfig = {
  url: import.meta.env.VITE_APPWRITE_URL,
  projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
  databaseId: import.meta.env.VITE_APPWRITE_DB_ID,
  storageId: import.meta.env.VITE_APPWRITE_STORAGE_ID,
  userCollectionId: import.meta.env.VITE_APPWRITE_USER_COLLECTION_ID,
  postCollectionId: import.meta.env.VITE_APPWRITE_POST_COLLECTION_ID,
  savesCollectionId: import.meta.env.VITE_APPWRITE_SAVES_COLLECTION_ID,
};

// 환경변수 검증 
if (!import.meta.env.VITE_APPWRITE_URL) {
  throw new Error("Missing Appwrite URL");
}

// Client 초기화화
export const client = new Client().setEndpoint(appwriteConfig.url).setProject(appwriteConfig.projectId);

// Appwrite 서비스 초기화 
export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);
