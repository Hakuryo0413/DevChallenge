import React from "react";
import CommonHeader from "@src/components/header/CommonHeader";
import QuestionForm from "@src/components/tabs/QuestionForm";

const QuestionFormPage: React.FC = () => {
  return (
    <div>
      <CommonHeader />
      <QuestionForm />
    </div>
  );
};

export default QuestionFormPage;
