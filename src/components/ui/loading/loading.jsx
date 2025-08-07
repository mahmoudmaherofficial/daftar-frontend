import React from "react";

const Loading = ({ fullPage }) => {
  return (
    <div className={`flex items-center justify-center ${fullPage && "min-h-[calc(100vh-146px)]"}`}>
      <div className="w-12 h-12 border-t-2 border-b-2 rounded-full border-[var(--primary)] animate-spin"></div>
    </div>
  );
};

export default Loading;
