import React, { useEffect, useState } from "react";
import CustomProvider from "../shared/CustomProvider";
import { List } from "antd";
import { getLeaderBoard } from "@src/features/auth/DetailMe";
import { UserInterface } from "@src/types/UserInterface";
import RewardIcon from "@src/assets/reward";
import Gold from "@src/assets/gold";
import Bronze from "@src/assets/bronze";
import Sliver from "@src/assets/sliver";

const LeaderboardTab: React.FC = () => {
  const [dataLeaderBoard, setDataLeaderBoard] = useState<UserInterface[]>([]);

  const fetchLeaderBoard = async () => {
    try {
      const data = await getLeaderBoard();
      setDataLeaderBoard(data.data);
    } catch (error) {
      console.error("Error fetching all news", error);
    }
  };

  useEffect(() => {
    fetchLeaderBoard();
  }, []);

  return (
    <CustomProvider>
      <div className="flex justify-center gap-4 my-4">
        <RewardIcon />
        <p className="font-bold text-2xl ">LEADERBOARD</p>
        <RewardIcon />
      </div>
      <List
        itemLayout="horizontal"
        dataSource={dataLeaderBoard}
        renderItem={(item, index) => (
          <List.Item
            className={`font-medium ${
              index % 2 === 0 ? "bg-gray-100" : "bg-transparent"
            }`}
          >
            {index == 0 && <Gold />}
            {index == 1 && <Sliver />}
            {index == 2 && <Bronze />}
            {<p className="pr-2">{index + 1}</p>}
            <List.Item.Meta title={<p>{item.email}</p>} />
            <div className="text-black">
              <span>
                {item?.total_points.toString() || null}{" "}
                <span className="text-orange-600">points</span>
              </span>
            </div>
          </List.Item>
        )}
      />
    </CustomProvider>
  );
};

export default LeaderboardTab;
