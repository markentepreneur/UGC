"use client";

import React, { ReactNode, useState } from "react";
import PolicyModel, { PolicyModalType } from "./PolicyModel";
import HeaderMenu from "./HeaderMenu";

interface Props {
  children: ReactNode;
}

const ClientLayout: React.FC<Props> = ({ children }) => {
  const [policyModelType, setPolicyModelType] =
    useState<PolicyModalType | null>(null);
  return (
    <div className="h-screen w-full bg-white flex flex-col relative overflow-hidden">
      <HeaderMenu setPolicyModelType={setPolicyModelType} />

      {policyModelType && (
        <PolicyModel
          type={policyModelType}
          onClose={() => setPolicyModelType(null)}
        />
      )}

      {children}
    </div>
  );
};

export default ClientLayout;
