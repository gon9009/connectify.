import { Link } from "react-router-dom";

const AuthForm = () => {
  // 회원가입 , 로그인 전용 폼 컴포넌트 , props 에 따라 달라진다 
  return (
    <>
      <form className="auth-form">
        <div className="auth-form__container">
          <label className="label auth-form__label" htmlFor="">
            Name
          </label>
          <input
            placeholder="이름을 입력해주세요"
            className="input auth-form__input"
          />
        </div>
        <div className="auth-form__container">
          <label className="label auth-form__label" htmlFor="">
            Email
          </label>
          <input className="input auth-form__input" />
        </div>
        <div className="auth-form__container">
          <label className="label auth-form__label" htmlFor="">
            Password
          </label>
          <input className="input auth-form__input" />
        </div>
        {/* 버튼도 auth-form__container 안에 감싸서 인풋과 동일한 너비 적용 */}
        <div className="auth-form__container">
          <button className="btn auth-form__btn" type="submit">
            회원가입
          </button>
        </div>
      </form>

      <p className="auth-form__description">
        이미 가입하셨나요 ?
        <Link className="auth-form__description-link" to="/sign-in">
          Sign In
        </Link>
      </p>
    </>
  );
};

export default AuthForm;
