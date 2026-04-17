import AIChatReview from "@/app/container/AIChatReview";
import React from "react";
import { notFound } from "next/navigation";

const page = () => {
  if (process.env.NEXT_PUBLIC_IS_PRODUCTION === "true") {
    notFound();
  }

  return <AIChatReview />;
};

export default page;
