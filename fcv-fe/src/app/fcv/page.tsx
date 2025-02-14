import { CoughSampleInput } from "@/components/CoughSampleInput/CoughSampleInput";
import { FcvResultsTable } from "@/components/FcvResultsTable/FcvResultsTable";
import { LogoutButton } from "@/components/Logout/Logout";
import { Separator } from "@/components/ui/separator";

export default function Page() {
  return (
    <div className="p-10 flex flex-col w-screen gap-5">
      <div className="w-full flex justify-end">
        <LogoutButton />
      </div>
      <CoughSampleInput />
      <Separator className="mt-4 bg-black" />
      <FcvResultsTable />
    </div>
  );
}
