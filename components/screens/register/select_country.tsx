"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SelectCountry() {
  return (
    <Select
      onValueChange={(value) => console.log("Selected:", value)}
      defaultValue="blank"
    >
      <SelectTrigger className="w-full text-left" label="Your Country">
        <SelectValue placeholder=" " />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="blank">Select One</SelectItem>
        <SelectItem value="indonesia">Indonesia</SelectItem>
        <SelectItem value="malaysia">Malaysia</SelectItem>
      </SelectContent>
    </Select>
  );
}
