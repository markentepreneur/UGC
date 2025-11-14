import React from "react";
import { LoaderCircle } from "lucide-react";

const Loading = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "200px",
      }}
    >
      <LoaderCircle className="animate-spin" size={48} />
      <span style={{ marginLeft: "16px", fontSize: "1.1rem" }}>Loading...</span>
    </div>
  );
};

export default Loading;
