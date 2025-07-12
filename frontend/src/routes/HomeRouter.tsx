import HomePage from "@src/pages/HomePage";
import LoginPage from "@src/pages/LoginPage";
import Portfolio from "@src/pages/Portfolio";
import ProfilePage from "@src/pages/ProfilePage";
import SignUpPage from "@src/pages/SignUpPage";
import React from "react";
import { Route, Routes } from "react-router-dom";
import QuestionPage from "@src/pages/QuestionPage";
import CodePage from "@src/pages/CodePage";
import QuestionFormPage from "@src/pages/QuestionFormPage";

function HomeRouter() {
  return (
    <div className="mx-20">
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/challenge/:id" element={<QuestionPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/question/:id/codeeditor" element={<CodePage />} />
        <Route path="/challenge/:id/create" element={<QuestionFormPage />} />

      </Routes>
    </div>
  );
}

export default HomeRouter;
