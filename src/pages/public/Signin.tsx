import AuthForm from "../../components/features/auth/AuthForm";
import logo from "../../assets/logo.png";

// 로그인 페이지
const Signin = () => {
  return (
    <>
      <img
        src={logo}
        alt="Connectify 로고"
        className="logo auth-container__logo"
      />
      <AuthForm />
    </>
  );
};

export default Signin;
