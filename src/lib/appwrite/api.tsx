import { ID, Query } from "appwrite";
import {
  appwriteConfig,
  account,
  databases,
  avatars,
} from "../appwrite/appwriteConfig";
import { NewUser } from "../../types/types";

// ========================================================== 인증 / 보안 API ==========================================================================================

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

    if (!newAccount) throw Error("계정 생성 실패");

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
    return session; // Appwrite 세션 객체 반환
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

// ===================================================== 게시물 (Post) ================================================================================
// 좋아요 상태 업데이트 (postId에 해당하는 게시물의 likes 배열을 업데이트)
export async function likePost(postId: string, likesArray: string[]) {
  try {
    const updatedPost = await databases.updateDocument(
      appwriteConfig.databaseId, // 데이터베이스 ID 지정
      appwriteConfig.postCollectionId, // 게시물 컬렉션 ID 지정
      postId, // 업데이트할 게시물 ID
      {
        likes: likesArray, // 좋아요를 누른 사용자 ID 배열을 업데이트
      }
    );

    if (!updatedPost) throw Error; // 업데이트 실패 시 예외 발생

    return updatedPost; // 업데이트된 게시물 반환
  } catch (error) {
    console.log(error); // 에러 로깅
  }
}

// 게시물 저장 (사용자가 특정 게시물을 저장할 때 실행)
export async function savePost(userId: string, postId: string) {
  try {
    const updatedPost = await databases.createDocument(
      appwriteConfig.databaseId, // 데이터베이스 ID 지정
      appwriteConfig.savesCollectionId, // 저장된 게시물 컬렉션 ID 지정
      ID.unique(), // 새로운 문서 ID 생성
      {
        user: userId, // 저장한 사용자 ID
        post: postId, // 저장된 게시물 ID
      }
    );

    if (!updatedPost) throw Error; // 저장 실패 시 예외 발생

    return updatedPost; // 생성된 저장 문서 반환
  } catch (error) {
    console.log(error); // 에러 로깅
  }
}

// 저장된 게시물 삭제 (사용자가 저장한 게시물을 제거할 때 실행)
export async function deleteSavedPost(savedRecordId: string) {
  try {
    const statusCode = await databases.deleteDocument(
      appwriteConfig.databaseId, // 데이터베이스 ID 지정
      appwriteConfig.savesCollectionId, // 저장된 게시물 컬렉션 ID 지정
      savedRecordId // 삭제할 저장 문서의 ID
    );

    if (!statusCode) throw Error; // 삭제 실패 시 예외 발생

    return { status: "Ok" }; // 삭제 성공 시 상태 반환
  } catch (error) {
    console.log(error); // 에러 로깅
  }
}

export async function getRecentPosts() {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      [Query.orderDesc("$createdAt"), Query.limit(20)]
    );

    if (!posts) throw Error;

    return posts;
  } catch (error) {
    console.log(error);
  }
}

// ==================================================== 유저 =======================================================

export async function getUsers(limit?: number) {
  const queries: any[] = [Query.orderDesc("$createdAt")];

  if (limit) {
    queries.push(Query.limit(limit));
  }

  try {
    const users = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      queries
    );

    if (!users) throw Error;

    return users;
  } catch (error) {
    console.log(error);
  }
}
