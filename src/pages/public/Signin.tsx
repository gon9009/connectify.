import SigninForm from "../../components/features/auth/SigninForm";
import { SigninFormData } from "../../lib/validation/auth";
import { useUserContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useSignInAccount } from "../../lib/react-query/queries";

// 로그인 페이지
const Signin = () => {
  const { checkAuth } = useUserContext();
  const { mutateAsync: signIn,isPending } = useSignInAccount();
  const navigate = useNavigate();

  const handleSubmit = async (data: SigninFormData) => {
    try {
      // 세션생성
      const session = await signIn(data);
      if (!session) {
        console.error("이메일 또는 비밀번호가 잘못되었습니다");
        return;
      }
      // 사용자 정보 업데이트
      const isLoggedIn = await checkAuth();
      if (isLoggedIn) {
        navigate("/");
      } else {
        console.error("인증 실패, 사용자 정보를 불러올 수 없습니다");
      }
    } catch (error) {
      console.error("로그인 처리 중 에러 발생", error);
    }
  };

  return <SigninForm 
  isPending={isPending}
  onSubmit={handleSubmit} />;
};

export default Signin;
