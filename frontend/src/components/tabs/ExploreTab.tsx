import React, { useEffect, useState } from "react";
import CustomProvider from "../shared/CustomProvider";
import { Card, List } from "antd";
import { getAllChallengs } from "@src/features/challenges/AllChallenges";
import { ChallengeInterface } from "@src/types/ChallengeInterface";
import { useNavigate } from "react-router-dom";

const ExploreTab: React.FC = () => {
  const [dataChallengs, setDataChallenges] = useState<ChallengeInterface[]>([]);
  const navigate = useNavigate();

  const fetchChallengs = async () => {
    try {
      const response = await getAllChallengs();
      console.log(response);
      setDataChallenges(response);
    } catch (error) {
      console.error("Error fetching all news", error);
    }
  };
  useEffect(() => {
    fetchChallengs();
  }, []);

  return (
    <CustomProvider>
      <p className="text-xl my-2">Featured</p>
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 4,
          lg: 4,
          xl: 4,
          xxl: 4,
        }}
        dataSource={dataChallengs}
        renderItem={(item) => (
          <List.Item>
            <Card
              title={
                <a
                  onClick={() => navigate(`/challenge/${item.id}`)}
                  className="!text-white hover:underline cursor-pointer text-lg font-semibold"
                >
                  {item.title}
                </a>
              }
              style={{
                backgroundImage: `url(${item.image_url})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                color: "white",
                minHeight: 230,
              }}
            >
              <div className="text-sm sm:text-base font-medium text-white space-y-2">
                <p className="text-white/90">{item.description}</p>

                <div className="text-xs text-white space-y-1 pt-1 ">
                  <p>Start date: {item.start_date}</p>
                  <p>End date: {item.end_date}</p>
                </div>
              </div>
            </Card>
          </List.Item>
        )}
      />
    </CustomProvider>
  );
};

export default ExploreTab;
