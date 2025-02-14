import { CoughSampleInput } from "@/components/CoughSampleInput/CoughSampleInput";
import { LogoutButton } from "@/components/Logout/Logout";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Page() {
  return (
    <div className="p-10 flex flex-col w-screen gap-5">
      <div className="w-full flex justify-end">
        <LogoutButton />
      </div>
      <CoughSampleInput />
      <Separator className="mt-4 bg-black" />
      <Table>
        <TableCaption>List of FCV Results</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Test Type</TableHead>
            <TableHead>Confidence</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>TB</TableCell>
            <TableCell>0.99</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
