import React, { ReactNode } from "react";
import DashboardBottomNavbar from "../../../components/Dashboard/DashboardBottomNavbar";

interface Props {
  children: ReactNode;
}

const DashboardMainLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="min-h-screen bg-custom-pink-light pb-24">
      <div className="max-w-6xl mx-auto px-6 py-8 pb-24">
        {children}
        <DashboardBottomNavbar />
      </div>
    </div>
  );
};

export default DashboardMainLayout;
