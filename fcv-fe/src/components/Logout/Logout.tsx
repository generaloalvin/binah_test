import { logout } from "@/actions/logout";
import { Button } from "../ui/button";

export const LogoutButton = () => {
  return (
    <form action={logout as any}>
      <Button type="submit">Logout</Button>
    </form>
  );
};
