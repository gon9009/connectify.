import SignupForm from "../../components/features/auth/SignupForm";
import { SignupFormData } from "../../lib/validation/auth";
import { useUserContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  useCreateUserAccount,
  useSignInAccount,
} from "../../lib/react-query/queries";

// 회원 가입 페이지
const Signup = () => {
  const { checkAuth } = useUserContext();
  const { mutateAsync: signUp } = useCreateUserAccount();
  const { mutateAsync: signInAccount } = useSignInAccount();

  const navigate = useNavigate();

  // 회원가입 양식에 주의!
  const handleSubmit = async (data: SignupFormData) => {
    try {
      // 1. 새로운 계정 생성
      const newUser = await signUp(data);
      if (!newUser) {
        console.error("계정을 생성할 수 없습니다 ");
        return;
      }
      // 2. 회원가입 후 로그인 (세션생성 )
      const session = await signInAccount({
        email: data.email,
        password: data.password,
      });
      if (!session) {
        console.error("로그인에 실패했습니다");
        navigate("/sign-in");
        return;
      }
      // 3. 사용자 정보 조회
      const isLoggedIn = await checkAuth();
      if (!isLoggedIn) {
        console.error("인증실패: 사용자 정보를 불러올 수 없습니다");
        return;
      }
      // 4.회원가입 성공후 - 폼초기화 , 홈으로 이동
      navigate("/");
    } catch (error) {
      console.log({ error });
    }
  };

  return <SignupForm onSubmit={handleSubmit} />;
};

export default Signup;
