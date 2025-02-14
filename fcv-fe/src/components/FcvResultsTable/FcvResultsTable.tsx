"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { getFcvResults } from "@/actions/getFcvResults";
import { TestType } from "@/lib/constants";
import { useToast } from "@/hooks/use-toast";
import { FcvResults } from "@/lib/api/backend";
import { TestTypeSelector } from "../TestTypeSelector/TestTypeSelector";

export const FcvResultsTable: React.FC = () => {
  const { toast } = useToast();
  const [results, setResults] = useState<FcvResults[]>([]);
  const [testType, setTestType] = useState<TestType>(TestType.TB_SMK);

  useEffect(() => {
    getFcvResults({
      test_type: testType,
    })
      .then((results) => {
        setResults(results);
      })
      .catch((error) => {
        console.error(error);
        toast({
          title: "Failed to get FCV results",
          description: "Please try again later",
          variant: "destructive",
        });
      });
  }, [testType]);

  const handleSelectTestType = (value: TestType) => {
    setTestType(value);
  };

  return (
    <div>
      <TestTypeSelector value={testType} onChange={handleSelectTestType} />
      <Table>
        <TableCaption>List of FCV Results</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Test Type</TableHead>
            <TableHead>Confidence</TableHead>
            <TableHead>Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {results.map((result, i) => (
            <TableRow key={i}>
              <TableCell>{result.test_type}</TableCell>
              <TableCell>{result.confidence}</TableCell>
              <TableCell>
                {new Date(result.created_at).toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
