import SigninForm from "../../components/features/auth/SigninForm";
import { SigninFormData } from "../../lib/validation/auth";

const Signin = () => {
  const handleSubmit = (data: SigninFormData) => {
    console.log(data);
  };

  return <SigninForm onSubmit={handleSubmit} />;
};

export default Signin;