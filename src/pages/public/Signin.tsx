import { SigninForm } from "../../components/features/auth/SigninForm";
import { SigninFormData } from "../../lib/validation/auth";
import { useUserContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useSignInAccount } from "../../lib/react-query/queries";
import { useState } from "react";

// 로그인 페이지
const Signin = () => {
  const { checkAuth } = useUserContext();
  const { mutateAsync: signIn, isPending } = useSignInAccount();
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (data: SigninFormData) => {
    try {
      // 세션생성
      const session = await signIn(data);
      if (!session) {
        setErrorMsg("이메일 또는 비밀번호가 잘못되었습니다");
        return;
      }
      const isLoggedIn = await checkAuth();
      if (isLoggedIn) {
        navigate("/");
      } else {
        setErrorMsg("인증 실패, 사용자 정보를 불러올 수 없습니다");
      }
    } catch (error) {
      console.error(error);
      setErrorMsg("로그인 처리 중 에러 발생");
    }
  };

  return (
    <>
      <SigninForm
        errorMsg={errorMsg}
        isPending={isPending}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default Signin;
