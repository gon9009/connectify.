import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signin from "./pages/public/Signin";
import Signup from "./pages/public/Signup";
import Home from "./pages/private/Home";
import PublicLayout from "./pages/layout/PublicLayout";
import ProtectedLayout from "./pages/layout/ProtectedLayout";
import Create from "./pages/private/Create";
import Edit from "./pages/private/Edit";
import PostDetails from "./pages/private/PostDetails";
import AllUsers from "./pages/private/AllUsers";
import Liked from "./pages/private/Profile/Liked";
import Saved from "./pages/private/Profile/Saved";
import Profile from "./pages/private/Profile";
import ProfilePosts from "./pages/private/Profile/ProfilePosts";
import ProfileEdit from "./pages/private/ProfileEdit";
import Explore from "./pages/private/Explore";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* 공용 라우트 - MainLayout으로 감싸 중앙정렬 */}
        <Route element={<PublicLayout />}>
          <Route path="/sign-in" element={<Signin />} />
          <Route path="/sign-up" element={<Signup />} />
        </Route>
        {/* 인증 라우트 */}
        <Route element={<ProtectedLayout />}>
          <Route index path="/" element={<Home />} />
          <Route path="/create-post" element={<Create />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/all" element={<AllUsers />} />
          <Route path="/profile/:id" element={<Profile />}>
            <Route index element={<ProfilePosts />} />
            <Route path="liked" element={<Liked />} />
            <Route path="saved" element={<Saved />} />
          </Route>
          <Route path="/edit-profile/:id" element={<ProfileEdit />} />
          {/* URL 이 상태를 저장하게 */}
          <Route path="/explore" element={<Explore />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
