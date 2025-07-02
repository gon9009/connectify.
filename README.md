# Connectify 

![](docs/ConnectifyLogo.png)

## 프로젝트 소개 

Connectify는 사진과 글을 쉽고 빠르게 업로드하고, 다른 사용자의 게시물을 탐색·검색·저장할 수 있는 웹 커뮤니티입니다.  
리액트와 Appwrite 백엔드를 활용해, 직관적인 UI와 소통 기능을 제공합니다.  

배포 URL: [connectify-one-kappa.vercel.app](https://connectify-one-kappa.vercel.app)


## 주요 기능 정리 

```
- 회원 가입/로그인 처리  
- 게시글 작성/수정/상세보기/삭제  
- 검색 + 무한 스크롤      
- 사용자 목록 조회  
- 게시글 좋아요 및 저장  
- 사용자 프로필 수정과 게시물 관리  
- 파일 업로드·미리보기
- 모바일 반응형 지원
```

## 사용 기술과 이유 

```
- **Frontend**  
  - React 19
  - TypeScript
  - React Router v7  
  - React Hook Form + Zod (폼/유효성)  
  - SCSS(BEM, 변수/믹스인 구조화)  
  - React Query (데이터 패칭/캐싱)  
  - React Dropzone (파일 업로드)  
  - Day.js (날짜 처리)

- **Backend**  
  - Appwrite (DB, Auth, Storage)
```

### React 19 + TypeScript

- React 19의 최신 기능을 적극 활용하여, 더욱 빠르고 최적화된 렌더링을 구현합니다.
- TypeScript는 프로젝트 규모가 커질수록 코드의 안정성과 유지보수성을 크게 높여주며, 정적 타입 검사로 런타임 오류를 사전에 방지합니다.

### React Router DOM (v7)

- SPA 환경에서 페이지 전환과 URL 관리를 효율적으로 처리하며, `BrowserRouter`, `Routes`, `Route` 등 컴포넌트로 직관적인 라우팅 구조를 제공합니다.

### TanStack React Query

- 서버 데이터의 캐싱과 동기화, 자동 갱신 등 데이터 관리의 효율성을 극대화합니다.
- 복잡한 API 상태 관리 없이도, `useQuery`, `useMutation`, `useInfiniteQuery` 등으로 네트워크 요청과 UI를 자연스럽게 연결할 수 있습니다.

### React Hook Form + Zod

- `react-hook-form`은 폼 상태를 최적화하여 불필요한 리렌더링을 최소화하고, 대규모 폼에서도 뛰어난 성능을 보장합니다.
- `Zod`와의 결합으로 입력값을 엄격하게 검증하여, 사용자 입력 오류를 사전에 차단합니다.

### SCSS

- 변수(`_variables.scss`), 믹스인(_mixins.scss) 등으로 스타일을 체계적으로 관리해 재사용성과 유지보수성을 높였습니다.
- BEM 네이밍과 SCSS 모듈 분리로, 대규모 프로젝트에서도 스타일 충돌 없이 명확한 구조를 유지합니다.

### React Intersection Observer

- 검색 및 피드 등에서 무한 스크롤을 구현할 때, 스크롤 위치를 감지하여 필요한 데이터만 동적으로 불러와 성능과 사용자 경험을 모두 잡았습니다.

### React Dropzone

- 게시물 작성 시 사진 등 파일 업로드를 쉽고 직관적으로 구현하기 위해 도입했습니다.
- 드래그 앤 드롭 인터페이스로, 사용자가 이미지를 올릴 때의 편의성을 크게 높였습니다.

### Day.js + RelativeTime 플러그인

- 게시물 작성 시간 등 날짜 정보를 "방금 전", "3시간 전"처럼 직관적으로 보여주어, 사용자 경험을 향상시켰습니다.

## Backend

#### Appwrite

- 인증, 데이터베이스, 파일 스토리지 등 핵심 백엔드 기능을 통합 제공하여, 별도의 서버 구축 없이도 빠르고 안정적인 인프라를 구현했습니다.
- 클라우드 기반으로 손쉬운 배포와 확장성을 지원하며, 프론트엔드와의 연동이 매우 용이합니다.
- 모든 Appwrite 관련 로직은 appwrite 경로에 체계적으로 정리되어 있습니다.

## 프로젝트 구조 

```
connectify.
├── public/
│   └── assets/
├── src/
│   ├── components/
│   │   ├── features/
│   │   │   ├── auth/
│   │   │   │   ├── SigninForm.tsx
│   │   │   │   └── SignupForm.tsx
│   │   │   ├── explore/
│   │   │   │   ├── ExploreHeader.tsx
│   │   │   │   └── SearchResult.tsx
│   │   │   ├── fileuploader/
│   │   │   │   ├── BaseFileUploader.tsx
│   │   │   │   ├── PostFileUploader.tsx
│   │   │   │   └── ProfileUploader.tsx
│   │   │   ├── posts/
│   │   │   │   ├── Divider.tsx
│   │   │   │   ├── EmptyState.tsx
│   │   │   │   ├── PostForm.tsx
│   │   │   │   ├── PostList.tsx
│   │   │   │   ├── PostListContainer.tsx
│   │   │   │   ├── PostStats.tsx
│   │   │   │   ├── index.ts
│   │   │   │   └── postcard/
│   │   │   │       ├── BasePostCard.tsx
│   │   │   │       ├── PostActions.tsx
│   │   │   │       ├── PostContent.tsx
│   │   │   │       ├── PostHeader.tsx
│   │   │   │       ├── PostImage.tsx
│   │   │   │       ├── PostInfo.tsx
│   │   │   │       ├── PostUserAvatar.tsx
│   │   │   │       ├── index.ts
│   │   │   │       └── variants/
│   │   │   │           ├── PostCardBase.tsx
│   │   │   │           ├── PostCardCompact.tsx
│   │   │   │           └── PostCardDetail.tsx
│   │   │   ├── profile/
│   │   │   │   ├── ProfileForm.tsx
│   │   │   │   └── ProfileFormHeader.tsx
│   │   │   └── user/
│   │   │       └── UserCard.tsx
│   │   ├── layout/
│   │   │   ├── MobileHeader.tsx
│   │   │   ├── MobileMenu.tsx
│   │   │   └── Sidebar.tsx
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── Input.tsx
│   │       ├── Label.tsx
│   │       ├── Loader.tsx
│   │       ├── Textarea.tsx
│   │       └── index.ts
│   ├── constants/
│   │   ├── authState.tsx
│   │   ├── formField.tsx
│   │   └── sidebar.tsx
│   ├── context/
│   │   └── AuthContext.tsx
│   ├── hooks/
│   │   ├── useDebounce.tsx
│   │   ├── useFileUploader.tsx
│   │   ├── useLikePostHandler.tsx
│   │   ├── usePostCardProps.tsx
│   │   └── useSavePostHandler.tsx
│   ├── lib/
│   │   ├── appwrite/
│   │   │   ├── api.tsx
│   │   │   └── appwriteConfig.tsx
│   │   ├── react-query/
│   │   │   └── queries.ts
│   │   └── validation/
│   │       ├── auth.tsx
│   │       └── profile.tsx
│   ├── pages/
│   │   ├── layout/
│   │   │   ├── ProtectedLayout.tsx
│   │   │   └── PublicLayout.tsx
│   │   ├── private/
│   │   │   ├── AllUsers.tsx
│   │   │   ├── Create.tsx
│   │   │   ├── Edit.tsx
│   │   │   ├── Explore.tsx
│   │   │   ├── Home.tsx
│   │   │   ├── PostDetails.tsx
│   │   │   ├── Profile.tsx
│   │   │   ├── ProfileEdit.tsx
│   │   │   └── Profile/
│   │   │       ├── Liked.tsx
│   │   │       ├── ProfilePosts.tsx
│   │   │       └── Saved.tsx
│   │   └── public/
│   │       ├── Signin.tsx
│   │       └── Signup.tsx
│   ├── styles/
│   │   ├── abstracts/
│   │   │   ├── _index.scss
│   │   │   ├── _mixins.scss
│   │   │   └── _variables.scss
│   │   ├── base/
│   │   │   ├── _base.scss
│   │   │   ├── _index.scss
│   │   │   ├── _reset.scss
│   │   │   └── _typo.scss
│   │   ├── components/
│   │   │   ├── _index.scss
│   │   │   ├── post/
│   │   │   │   ├── _fileuploader.scss
│   │   │   │   ├── _index.scss
│   │   │   │   ├── _post-card.scss
│   │   │   │   ├── _postform.scss
│   │   │   │   ├── _postlist.scss
│   │   │   │   └── _poststats.scss
│   │   │   ├── profile/
│   │   │   │   ├── _profileeditform.scss
│   │   │   │   ├── _profileuploader.scss
│   │   │   │   └── index.scss
│   │   │   ├── ui/
│   │   │   │   ├── _button.scss
│   │   │   │   ├── _form.scss
│   │   │   │   ├── _input.scss
│   │   │   │   ├── _label.scss
│   │   │   │   ├── _loader.scss
│   │   │   │   └── index.scss
│   │   │   └── user/
│   │   │       ├── _index.scss
│   │   │       └── _usercard.scss
│   │   ├── layout/
│   │   │   ├── _index.scss
│   │   │   ├── _layout.scss
│   │   │   ├── _mobileHeader.scss
│   │   │   ├── _mobileMenu.scss
│   │   │   └── _sidebar.scss
│   │   ├── pages/
│   │   │   ├── _allusers.scss
│   │   │   ├── _editcreate.scss
│   │   │   ├── _explore.scss
│   │   │   ├── _home.scss
│   │   │   ├── _index.scss
│   │   │   ├── _postdetails.scss
│   │   │   ├── _profile.scss
│   │   │   └── _profileedit.scss
│   │   ├── utils/
│   │   │   └── _index.scss
│   │   └── main.scss
│   └── types/
│       ├── index.ts
│       ├── post.types.ts
│       └── types.ts
├── package.json
├── vite.config.ts
└── ...
```

## 역할/개발 기간 

```
- 1인 개발 
- 개발 기간: 02/09 - 03/22 + 지속적 리팩토링 
```

## UI 


|           데스크탑            |            모바일            |
| :---------------------------: | :--------------------------: |
| ![](docs/Connectify%20데스크탑.png) | ![](docs/Connectify%20모바일.png) |

|           회원가입            |         로그인             |
| :---------------------------: | :------------------------: | 
| ![](docs/Connectify%20회원가입.png) | ![](docs/Connectify%20로그인.png) |

|           프로필            |  
| :---------------------------: |
| ![](docs/Connectify%20프로필.png) |

|           프로필 수정            |  
| :---------------------------: |
| ![](docs/Connectfiy%20프로필%20수정.png) |

|           글쓰기            |  
| :---------------------------: |
| ![](docs/Connectify%20글쓰기.png) |

|           탐색            |  
| :---------------------------: |
| ![](docs/Connectify%20검색.png) |

|           글 수정            |  
| :---------------------------: |
| ![](docs/Connectify%20글%20수정.png) |

|           사용자 목록            |  
| :---------------------------: |
| ![](docs/Connectify%20사용자들.png) |

## 트러블 슈팅 

### 1. 다양한 카드 컴포넌트의 구조화와 관리

**문제**  

게시물 카드 UI가 “기본”, “컴팩트”, “디테일” 등 다양한 형태로 여러 컴포넌트에서 사용 되었습니다 그로인해,각 카드마다 레이아웃, props, 렌더링 방식이 달라 코드 중복과 유지보수 어려움이 발생하였고,카드별로 공통 데이터와 UI 로직을 어떻게 분리·재사용할지 고민이 많았습니다 

**해결**  

카드 variant별로 컴포넌트를 분리(`PostCardBase`, `PostCardCompact`, `PostCardDetail`)하고,   공통 props 가공 로직을 커스텀 훅(`usePostCardProps`)으로 추출.  레이아웃은 `BasePostCard`에서 통합 관리, 각 variant는 필요한 UI만 조합하는 방식으로 코드중복을 제거, 새로운 카드 타입 추가 변경을 간편하게 하였습니다 


### 2. 무한스크롤 + 검색 동시 구현

**문제**  

검색기능과 무한 스크롤을 동시에 적용하려 하니, 검색어 변경/페이지네이션/데이터 중복/최신순 정렬 등 복잡한 상태 관리 이슈가 발생하고 검색 결과가 오래된 순으로 나오는 등의 UX 문제가 있었습니다 

**해결**  

`react-intersection-observer`로 스크롤 위치 감지, `useInfiniteQuery`로 페이지네이션 및 캐싱을 효율적으로 구현하여 코드 복잡도를 감소시키고 
검색 API에 최신순 정렬 쿼리(Query.orderDesc)를 추가해 UX 개선후 검색어 변경 시 쿼리키를 활용해 캐시와 UI가 즉시 동기화되도록 처리하였습니다 


### 3. 클라이언트 좋아요 + 저장 동기화

**문제**

좋아요나 저장 버튼을 눌렀을 때, 리스트, 상세, 프로필 등 여러 화면에서 데이터가 동시에 바뀌어야 했습니다. 하지만 React Query를 쓰면서 어떤 쿼리를 언제 어떻게 갱신할지 헷갈려서 단순히 `invalidateQueries`만 했더니, UI가 바로 반영되지 않거나 일부 화면에서는 데이터가 어긋나는 상황이 발생했습니다. 이런 상태 관리가 복잡해지면서 사용자 경험에 악영향을 주었습니다.

**해결**

좋아요와 저장 액션 후 관련된 모든 쿼리, 예를 들어 `getPosts`, `getRecentPosts`, `getCurrentUser` 등을 명확하게 무효화하는 체계를 만들었습니다. 그리고 어떤 액션이 어떤 화면에 영향을 주는지 꼼꼼히 정리해 일관되게 반영하도록 했습니다. 덕분에 여러 화면의 데이터가 어긋나지 않고, 사용자가 즉시 변화를 체감할 수 있는 안정적인 UI와 데이터 동기화를 구현할 수 있었습니다.


### 4. TS + Zod : 타입 안정성과 폼 검증 트러블슈팅

**문제**

Zod로 폼 검증을 진행할 때, 폼 데이터 타입과 API 타입이 달라서 자주 타입 에러가 발생했습니다. 예를 들어 태그 입력은 string인데 서버에서는 string 배열이 필요했고, 파일 업로드는 타입 추론이 애매해서 런타임 오류 위험도 컸습니다. 이런 불일치가 개발 생산성을 떨어뜨리고 사용자 경험에도 악영향을 줬습니다.

**해결**

Zod의 타입 추론(`z.infer`)과 TypeScript 타입을 정확히 맞추고, 폼 제출 시 string → string[] 변환 같은 데이터 변환 로직을 명확히 처리했습니다. 에러 메시지도 타입 안전하게 관리하도록 컴포넌트와 타입 정의를 개선했죠. 결과적으로 폼 입력값 오류를 빠르게 잡고, 런타임 에러 없이 안정적인 폼 UX를 제공할 수 있었습니다.


### 5. Appwrite 연동: 인증/스토리지/DB 트러블슈팅

**문제**

Appwrite API 반환 타입이 불명확하거나, DB 구조와 프론트엔드 타입이 어긋나는 경우가 많아 타입 에러와 데이터 불일치가 자주 발생했습니다. 인증, 세션, 파일 업로드/삭제, DB 문서 생성/수정 과정에서 네트워크 에러와 권한 문제도 빈번했습니다.

**해결**

API 호출 함수별로 반환 타입을 명확히 지정하고, 응답 데이터에서 필요한 필드만 추출해 프론트 타입과 완벽히 일치하도록 조정했습니다.
덕분에 Appwrite와 프론트엔드 간 데이터 불일치를 줄이고, 코드 안정성을 크게 높일 수 있었습니다.

