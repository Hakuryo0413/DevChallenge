import React from "react";
import CommonHeader from "@src/components/header/CommonHeader";
import Profile from "@src/components/tabs/ProfileTab";

const ProfilePage: React.FC = () => {
  return (
    <div>
      <CommonHeader />
      <Profile />
    </div>
  );
};

export default ProfilePage;
