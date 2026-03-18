import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export interface ServiceCardProps {
  header: React.ReactNode;
  details: React.ReactNode;
  buttonText: string;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  header,
  details,
  buttonText,
}) => {
  const handleClick = () => {
    const section = document.getElementById("contact");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Card className="relative mx-auto w-full max-w-64 min-h-56 lg:min-h-64 lg:max-w-105 rounded-xl border border-ring/30 bg-card/30 shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold leading-tight text-primary sm:text-xl">
          {header}
        </CardTitle>
        <CardDescription className="text-sm leading-relaxed text-muted-foreground sm:text-base">
          {details}
        </CardDescription>
      </CardHeader>
      <CardContent className="absolute bottom-5 right-0 flex justify-end ">
        <Button
          type="button"
          onClick={handleClick}
          className="w-full bg-transparent text-lg font-medium text-white sm:w-auto sm:min-w-35 cursor:pointer hover:text-[#D5A310] hover:underline transition-colors duration-300 "
        >
          {buttonText}
        </Button>
      </CardContent>
    </Card>
  );
};
