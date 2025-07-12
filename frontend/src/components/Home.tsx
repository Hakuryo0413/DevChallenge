import React from "react";
import { ConfigProvider, Tabs } from "antd";
import ProblemTab from "./tabs/ProblemTab";
import ExploreTab from "./tabs/ExploreTab";
import LeaderboardTab from "./tabs/LeaderboardTab";

const Home: React.FC = () => (
  <ConfigProvider
    theme={{
      components: {
        Tabs: {
          // colorText: "white",
          // itemColor: "white",
          // itemHoverColor: "orange",
          // itemSelectedColor: "orange",
          // inkBarColor: "orange",
        },
      },
    }}
  >
    <div className="mx-8 lg:px-20 md:px-10">
      <Tabs
        defaultActiveKey="1"
        centered
        items={[
          {
            label: "Explore",
            key: "1",
            children: (
              <>
                <ExploreTab />
              </>
            ),
          },
          {
            label: "Problems",
            key: "2",
            children: (
              <>
                <ProblemTab />
              </>
            ),
          },
          {
            label: "Leaderboard",
            key: "3",
            children: (
              <>
                <LeaderboardTab />
              </>
            ),
          },
        ]}
      />
    </div>
  </ConfigProvider>
);

export default Home;
