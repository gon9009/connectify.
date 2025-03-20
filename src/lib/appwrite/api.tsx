import { ID, ImageGravity, Query, Models } from "appwrite";
import {
  appwriteConfig,
  account,
  databases,
  avatars,
  storage,
} from "../appwrite/appwriteConfig";
import {
  NewUser,
  CreatePostType,
  UpdatePostType,
  Post,
  CurrentUser,
  UpdateUserType,
  ProfileUser,
} from "../../types/types";

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
export async function getCurrentUser(): Promise<CurrentUser | null> {
  try {
    // 1. 현재 계정 정보 조회
    const currentAccount = await account.get();
    if (!currentAccount) throw new Error("계정 정보를 가져오지 못했습니다.");

    // 2. DB에서 사용자 정보 조회
    const response = await databases.listDocuments<CurrentUser>(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    // 3. 사용자 정보가 없을 경우 처리 (빈 배열 대응)
    if (!response.documents.length) {
      return null;
    }

    return response.documents[0]; // 항상 올바른 데이터를 반환
  } catch (error) {
    console.error("getCurrentUser() 실패:", error);
    throw new Error("사용자 정보를 불러오는 중 오류가 발생했습니다.");
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

    return updatedPost;
  } catch (error) {
    console.log(error);
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

export async function getPostById(postId?: string) {
  if (!postId) throw Error;
  try {
    const post = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      postId
    );
    if (!post) throw Error;
    return post as Post;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deletePost(postId?: string, imageId?: string) {
  if (!postId || !imageId) return;

  try {
    const statusCode = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      postId
    );

    if (!statusCode) throw Error;

    await deleteFile(imageId);

    return { status: "Ok" };
  } catch (error) {
    console.log(error);
  }
}

export async function getUserPosts(userId?: string): Promise<Post[]> {
  if (!userId) return [];

  try {
    const post = await databases.listDocuments<Post>(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      [Query.equal("creator", userId), Query.orderAsc("$createdAt")]
    );

    if (!post) throw Error;

    return post.documents;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// ==================================================== 유저(User) =======================================================
export async function getUsers() {
  const queries: any[] = [Query.orderDesc("$createdAt")];

  try {
    const users = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      queries
    );

    if (!users) throw new Error("유저를 찾을수 없습니다");

    return {
      documents: users.documents.map(({ $id, imageUrl, name, username }) => ({
        $id,
        imageUrl: imageUrl || "/assets/icons/profile-placeholder.svg",
        name,
        username,
      })),
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// 아이디별 유저
export async function getUserById(userId: string): Promise<ProfileUser> {
  try {
    const user = await databases.getDocument<ProfileUser>(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      userId
    );

    if (!user) {
      throw new Error("사용자를 찾을 수 없습니다.");
    }

    return user;
  } catch (error) {
    console.error("사용자 정보를 가져오는 중 오류 발생:", error);
    throw new Error("사용자 정보를 불러오지 못했습니다.");
  }
}
// ====================================== 파일 CRUD  ===========================================================

// 파일 업로드
export async function uploadFile(file: File) {
  try {
    const uploadedFile = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      file
    );

    return uploadedFile;
  } catch (error) {
    console.log(error);
  }
}

// 사진 미리보기
export function getFilePreview(fileId: string) {
  try {
    const fileUrl = storage.getFilePreview(
      appwriteConfig.storageId,
      fileId,
      2000,
      2000,
      "top" as ImageGravity,
      100
    );

    if (!fileUrl) throw Error;

    return fileUrl;
  } catch (error) {
    console.log(error);
  }
}

// 파일 삭제하기
export async function deleteFile(fileId: string) {
  try {
    await storage.deleteFile(appwriteConfig.storageId, fileId);

    return { status: "ok" };
  } catch (error) {
    console.log(error);
  }
}

// 게시물 새로 생성 (Create)
export async function createPost(post: CreatePostType) {
  try {
    // Upload file to appwrite storage
    const uploadedFile = await uploadFile(post.file[0]);

    if (!uploadedFile) throw Error;

    // Get file url
    const fileUrl = getFilePreview(uploadedFile.$id);
    if (!fileUrl) {
      await deleteFile(uploadedFile.$id);
      throw Error;
    }

    // Convert tags into array
    const tags = post.tags?.replace(/ /g, "").split(",") || [];

    //  [공식 API 그대로 사용] 문서 생성 (Appwrite `createDocument`)
    const newPost = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      ID.unique(),
      {
        creator: post.userId,
        caption: post.caption,
        imageUrl: fileUrl,
        imageId: uploadedFile.$id,
        location: post.location,
        tags: tags,
      }
    );

    if (!newPost) {
      await deleteFile(uploadedFile.$id);
      throw Error;
    }

    return newPost;
  } catch (error) {
    console.log(error);
  }
}

// 게시물 수정 (Edit)
export async function updatePost(post: UpdatePostType) {
  const hasFileToUpdate = post.file?.length > 0;

  try {
    let image = {
      imageUrl: post.imageUrl,
      imageId: post.imageId,
    };

    if (hasFileToUpdate) {
      // Upload new file to appwrite storage
      const uploadedFile = await uploadFile(post.file[0]);
      if (!uploadedFile) throw Error;

      // Get new file url
      const fileUrl = getFilePreview(uploadedFile.$id);
      if (!fileUrl) {
        await deleteFile(uploadedFile.$id);
        throw Error;
      }

      image = { ...image, imageUrl: fileUrl, imageId: uploadedFile.$id };
    }

    // Convert tags into array
    const tags = post.tags?.replace(/ /g, "").split(",") || [];

    //  [공식 API 그대로 사용] 문서 업데이트 (Appwrite `updateDocument`)
    const updatedPost = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      post.postId,
      {
        caption: post.caption,
        imageUrl: image.imageUrl,
        imageId: image.imageId,
        location: post.location,
        tags: tags,
      }
    );

    if (!updatedPost) {
      if (hasFileToUpdate) {
        await deleteFile(image.imageId);
      }

      throw Error;
    }

    if (hasFileToUpdate) {
      await deleteFile(post.imageId);
    }

    return updatedPost;
  } catch (error) {
    console.log(error);
  }
}

// ===================================================== 사용자 정보 업데이트 =============================================================
export async function updateUser(user: UpdateUserType) {
  const hasFileToUpdate = user.file.length > 0;
  try {
    let image = {
      imageUrl: user.imageUrl,
      imageId: user.imageId,
    };

    if (hasFileToUpdate) {
      const uploadedFile = await uploadFile(user.file[0]);
      if (!uploadedFile) throw Error;

      const fileUrl = getFilePreview(uploadedFile.$id);
      if (!fileUrl) {
        await deleteFile(uploadedFile.$id);
        throw Error;
      }

      image = { ...image, imageUrl: fileUrl, imageId: uploadedFile.$id };
    }

    //  Update user
    const updatedUser = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      user.userId,
      {
        name: user.name,
        bio: user.bio,
        imageUrl: image.imageUrl,
        imageId: image.imageId,
      }
    );

    if (!updatedUser) {
      if (hasFileToUpdate) {
        await deleteFile(image.imageId);
      }

      throw Error;
    }

    if (user.imageId && hasFileToUpdate) {
      await deleteFile(user.imageId);
    }

    return updatedUser;
  } catch (error) {
    console.log(error);
  }
}

// ====================================================== 검색 + 무한 스크롤 =============================================================
export async function searchInfinitePosts(searchTerm: string, pageParam?: string) {
  const queries = [
    Query.search("caption", searchTerm),
    Query.limit(10),
  ];

  if (pageParam) {
    queries.push(Query.cursorAfter(pageParam));
  }

  try {
    const response = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      queries
    );

    return {
      documents: response.documents.map((doc) => ({
        ...doc,
        creator: {
          $id: doc.creator?.$id ?? "",
          name: doc.creator?.name ?? "Unknown",
          imageUrl: doc.creator?.imageUrl ?? "",
        },
        likes: doc.likes ?? [],
      })) as Post[],
      hasNextPage: response.documents.length === 10,
    };
  } catch (error) {
    console.error("검색 오류류", error);
    throw error;
  }
}
