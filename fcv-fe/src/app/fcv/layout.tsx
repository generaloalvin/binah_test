import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();

  if (!cookieStore.get("token")) {
    return redirect("/");
  }

  return <div>{children}</div>;
}
