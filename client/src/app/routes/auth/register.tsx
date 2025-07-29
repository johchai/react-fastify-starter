import { Link } from "react-router";

export const RegisterRoute = () => {
  return (
    <div>
      <div>RegisterRoute</div>
      <Link to="/auth/login">LoginRoute</Link>
    </div>
  );
};

export default RegisterRoute;
