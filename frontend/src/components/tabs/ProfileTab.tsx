import React, { useEffect, useState } from "react";
import { Button, ConfigProvider, Card, Avatar } from "antd";

import { LeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import { UserInterface } from "@src/types/UserInterface";
import { getDetailUser } from "@src/features/auth/DetailMe";
const { Meta } = Card;

const Profile: React.FC = () => {
  let navigate = useNavigate();
  let user_id = 1;
  const [userDetail, setUserDetail] = useState<UserInterface>();
  const getUser = async (user_id: Number) => {
    try {
      const data = await getDetailUser(user_id);
      setUserDetail(data.data);
    } catch (error) {
      console.error("Error fetching all news", error);
    }
  };

  useEffect(() => {
    getUser(user_id);
  }, []);
  return (
    <ConfigProvider
      theme={{
        components: {
          Form: {
            labelColor: "white",
          },
          Button: {
            colorPrimary: "black",
          },
        },
      }}
    >
      <div className="space-y-6 px-40">
        <div className=" m-4 p-4 rounded-2xl ">
          <Button type="text" onClick={() => navigate("/home")}>
            <LeftOutlined />
            Back
          </Button>

          <Card style={{ width: "100%" }}>
            <Meta
              avatar={
                <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />
              }
              title={userDetail?.email}
            />

            <div className="space-y-3 mt-4">
              <div className="flex justify-between">
                <p className="text-gray-500 font-medium">Full Name:</p>
                <p className="text-gray-800">{userDetail?.email}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-500 font-medium">Rank:</p>
                <p className="text-gray-800">100</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-500 font-medium">Total Points:</p>
                <p className="text-gray-800">
                  {userDetail?.total_points.toString()}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default Profile;
