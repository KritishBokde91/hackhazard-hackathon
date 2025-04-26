import LoginComp from "@/components/login";
import { Suspense } from "react";


const LoginPage = () => {

  return (
    <Suspense>
      <LoginComp />
    </Suspense>
  );
}

export default LoginPage;