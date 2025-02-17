import SignupForm from "../../components/features/auth/SignupForm";
import { SignupFormData } from "../../lib/validation/auth";

const Signup = () => {
  const handleSubmit = (data: SignupFormData) => {
    console.log(data);
  };

  return <SignupForm onSubmit={handleSubmit} />;
};

export default Signup;
