import React, { use, useEffect, useState } from "react";

import { dateFormater } from "@src/utils/common";
import CustomProvider from "../shared/CustomProvider";
import { Avatar, Button, Card, Col, List, Row } from "antd";
import { QuestionInterface } from "@src/types/QuestionInterface";
import { getAllQuestions } from "@src/features/questions/AllQuestions";
import CustomTag from "../shared/CustomTag";
import { StarOutlined } from "@ant-design/icons";

const dataCourse = [
  {
    image_url:
      "https://assets.leetcode.com/users/images/49479bba-73b3-45d2-9272-99e773d784b2_1687290663.3168745.jpeg",
  },
  {
    image_url:
      "https://assets.leetcode.com/users/images/770789b0-c96b-4663-86d1-baab25534864_1669795265.8012726.png",
  },
  {
    image_url:
      "https://assets.leetcode.com/users/images/1871a4e4-3f06-4e47-9b4d-e586265ab94d_1749761181.1134677.png",
  },
];

const ProblemTab: React.FC = () => {
  const [dataQuestion, setDataQuestion] = useState<QuestionInterface[]>([]);

  const fetchQuestion = async () => {
    try {
      const data = await getAllQuestions();
      setDataQuestion(data);
    } catch (error) {
      console.error("Error fetching all news", error);
    }
  };

  useEffect(() => {
    fetchQuestion();
  }, []);

  return (
    <CustomProvider>
      <List
        grid={{ gutter: 16, column: 3 }}
        dataSource={dataCourse}
        renderItem={(item) => (
          <List.Item>
            <Card
              style={{
                backgroundImage: `url(${item.image_url})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                color: "white",
                height: "22vh", // 30% chiều cao màn hình hiện tại
              }}
            />
          </List.Item>
        )}
      />
      <List
        itemLayout="horizontal"
        dataSource={dataQuestion}
        renderItem={(item, index) => (
          <List.Item
            className={`font-medium ${
              index % 2 === 0 ? "bg-gray-100" : "bg-transparent"
            }`}
          >
            <p className="pr-2">{index + 1}</p>
            <List.Item.Meta
              title={
                <a href={`/question/${item.id}/codeeditor`}>{item.title}</a>
              }
            />
            <div className="text-black">
              <CustomTag category={item?.level} />
            </div>
            <StarOutlined />
          </List.Item>
        )}
      />
    </CustomProvider>
  );
};

export default ProblemTab;
