import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signin from "./pages/public/Signin";
import Signup from "./pages/public/Signup";
import Home from "./pages/private/Home";
import PublicLayout from "./pages/layout/PublicLayout";
import ProtectedLayout from "./pages/layout/ProtectedLayout";
import Create from "./pages/private/Create";
import Edit from "./pages/private/Edit";

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
          <Route path="/create-post" element={<Create/>} />
          <Route path="/edit/:id" element={<Edit />} />
        </Route>

      </Routes>
    </Router>
  );
};

export default App;
