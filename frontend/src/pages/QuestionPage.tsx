import React from "react";
import CommonHeader from "@src/components/header/CommonHeader";
import { useParams } from "react-router-dom";
import QuestionsTab from "@src/components/tabs/QuestionsTab";

const QuestionPage: React.FC = () => {
  return (
    <div>
      <CommonHeader />
      <QuestionsTab />
    </div>
  );
};

export default QuestionPage;
