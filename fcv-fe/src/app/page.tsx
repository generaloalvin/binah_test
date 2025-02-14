import { Login } from "@/components/Login/Login";
import { login } from "@/actions/login";

export default function Home() {
  return (
    <div>
      <Login loginAction={login} />
    </div>
  );
}
