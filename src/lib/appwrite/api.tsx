import { ID, Query } from "appwrite";
import {
  appwriteConfig,
  account,
  databases,
  avatars,
} from "../appwrite/appwriteConfig";
import { NewUser } from "../../types/types";

// 회원가입 프로세스 
export async function createUserAccount(user: NewUser) {
  try {
    // 1. Appwrite 계정 생성
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    );

    if (!newAccount) throw Error ("계정 생성 실패");

    // 2. 사용자 아바타 URL 생성, string 을 반환한다다
    const avatarUrl = avatars.getInitials(user.name);
    // 3. 사용자 정보를 DB에 저장
    const newUser = await saveUserToDB({
      accountId: newAccount.$id,
      name: newAccount.name,
      email: newAccount.email,
      username: user.username,
      imageUrl: avatarUrl,
    });

    return newUser;
  } catch (error) {
    console.log(error);
    return error;
  }
}

// DB에 사용자 정보 저장
export async function saveUserToDB(user: {
  accountId: string;
  email: string;
  name: string;
  imageUrl: URL | string;
  username?: string;
}) {
  try {
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      user
    );

    return newUser;
  } catch (error) {
    console.log(error);
  }
}

// 로그인:이메일 세션 생성 (Query)
export async function signInAccount(user: { email: string; password: string }) {
  try {
    // 이메일 + 비밀번호를 통한 세션 생성 
    const session = await account.createEmailPasswordSession(
      user.email,
      user.password
    );
    return session;   // Appwrite 세션 객체 반환 
  } catch (error) {
    console.log(error);
  }
}

// 로그아웃: 현재 세션 삭제 (Query)
export async function signOutAccount() {
  try {
    const session = await account.deleteSession("current");
    return session;
  } catch (error) {
    console.log(error);
    throw error; 
  }
}

// 현재 로그인한 사용자 정보 조회
export async function getCurrentUser() {
  try {
    // 1.현재 계정 정보 조회
    const currentAccount = await account.get();
    if (!currentAccount) throw Error;

    // 2. DB에서 사용자 정보 조회
    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;
    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}
