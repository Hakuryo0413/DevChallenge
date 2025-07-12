import { Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

function Portfolio() {
  const navigate = useNavigate();
  return (
    <div className="pt-2">
      <div className="max-w-8xl px-6 lg:px-8 pt-40 w-full">
        <div className=" items-center">
          <div className="text-center">
            <h2 className="text-3xl text-black font-black font-mono  sm:text-7xl">
              A New Way to Learn
            </h2>
            <p className="mt-6 text-xl leading-8 text-[16px] text-black font-semibold">
              LeetCode is the best platform to help you enhance your skills,
              expand your knowledge and prepare for technical interviews.
            </p>
            <Button
              className="mt-6 !bg-orange-500 !text-white !border-none"
              onClick={() => navigate("/home")}
            >
              Get Started Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Portfolio;
