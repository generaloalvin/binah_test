"use client";

import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { TestType } from "@/lib/constants";
import { processCoughSample } from "@/actions/processCoughSample";
import { TestTypeSelector } from "../TestTypeSelector/TestTypeSelector";
import { useToast } from "@/hooks/use-toast";
import { validateAudioFile } from "@/lib/validation";

export const CoughSampleInput: React.FC = () => {
  const { toast } = useToast();
  const [selectedTestType, setSelectedTestType] = React.useState<TestType>(
    TestType.TB
  );

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const validationFile = validateAudioFile(file);

    if (!validationFile.valid) {
      toast({
        title: "Invalid file type",
        description: validationFile.error,
        variant: "destructive",
      });
      return;
    }

    const testType =
      selectedTestType === TestType.TB_SMK
        ? [TestType.TB, TestType.SMK]
        : [selectedTestType];

    try {
      await processCoughSample({
        cough_sample: file,
        test_type: testType,
      });
    } catch (error) {
      toast({
        title: "Failed to process cough sample",
        description: "Please try again later",
        variant: "destructive",
      });
    }
  };

  const handleSelectTestType = (value: TestType) => {
    setSelectedTestType(value);
  };

  return (
    <div>
      <TestTypeSelector
        value={selectedTestType}
        onChange={handleSelectTestType}
      />
      <Label htmlFor="file">Upload Cough Sample</Label>
      <Input
        id="file"
        type="file"
        accept=".wav"
        className="bg-green-800 text-white"
        onChange={handleFileUpload}
      />
    </div>
  );
};
