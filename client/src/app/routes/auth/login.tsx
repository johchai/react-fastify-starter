import { Link } from "react-router";

export const LoginRoute = () => {
  return (
    <div>
      <div>LoginRoute</div>
      <Link to="/auth/register">Register</Link>
    </div>
  );
};

export default LoginRoute;
