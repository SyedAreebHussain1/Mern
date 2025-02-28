import React from "react";

type PageContainerProps = {
  children: React.ReactNode;
};

export const PageContainer = ({ children }: PageContainerProps) => {
  return <div className="max-w-7xl mx-auto ">{children}</div>;
};
