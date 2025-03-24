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
  const { mutateAsync: signInAccount,isPending } = useSignInAccount();

  const navigate = useNavigate();

  const handleSubmit = async (data: SignupFormData) => {
    try {
      const newUser = await signUp(data);
      if (!newUser) {
        console.error("계정을 생성할 수 없습니다 ");
        return;
      }
      const session = await signInAccount({
        email: data.email,
        password: data.password,
      });
      if (!session) {
        console.error("로그인에 실패했습니다");
        navigate("/sign-in");
        return;
      }
      const isLoggedIn = await checkAuth();
      if (!isLoggedIn) {
        console.error("인증실패: 사용자 정보를 불러올 수 없습니다");
        return;
      }
      navigate("/");
    } catch (error) {
      console.log({ error });
    }
  };

  return <SignupForm 
  isPending={isPending}
  onSubmit={handleSubmit} />;
};

export default Signup;
