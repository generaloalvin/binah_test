import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { TestType } from "@/lib/constants";

export interface TestTypeSelectorProps {
  value: TestType;
  onChange: (value: TestType) => void;
}

export const TestTypeSelector: React.FC<TestTypeSelectorProps> = ({
  value,
  onChange,
}) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder="Test Type" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={TestType.SMK}>SMK</SelectItem>
        <SelectItem value={TestType.TB}>TB</SelectItem>
        <SelectItem value={TestType.TB_SMK}>SMK and TB</SelectItem>
      </SelectContent>
    </Select>
  );
};
