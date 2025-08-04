import { AuthLayout } from "@client/components";
import { paths } from "@client/config";
import { LoginForm } from "@client/features";

import { useNavigate, useSearchParams } from "react-router";

const LoginRoute = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo");

  return (
    <AuthLayout title="Test">
      <LoginForm
        onSuccess={() => {
          navigate(`${redirectTo ? `${redirectTo}` : paths.root.getHref()}`, {
            replace: true
          });
        }}
        onFailure={() => {}}
      />
    </AuthLayout>
  );
};

export default LoginRoute;
