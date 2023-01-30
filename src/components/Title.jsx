import React from "react";
import { useNavigate } from "react-router-dom";

export const Title = () => {
  const navigate = useNavigate();
  return (
    <h4
      className="font-bold cursor-pointer text-[32px]"
      onClick={() => navigate("/home")}
    >
      <span className="text-orange-600">Pixel</span>
      <span className="text-slate-600 dark:text-white">Peers</span>
    </h4>
  );
};
