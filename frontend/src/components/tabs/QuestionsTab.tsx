import React, { useEffect, useState } from "react";

import CustomProvider from "../shared/CustomProvider";
import {
  Button,
  Card,
  Col,
  Divider,
  List,
  Modal,
  Row,
  Space,
  Typography,
} from "antd";
import { QuestionInterface } from "@src/types/QuestionInterface";
import { getAllQuestionsOfChallenge } from "@src/features/questions/AllQuestions";
import CustomTag from "../shared/CustomTag";
import { useNavigate, useParams } from "react-router-dom";
import {
  DeleteOutlined,
  ExportOutlined,
  MessageOutlined,
  PlayCircleOutlined,
  ShareAltOutlined,
  StarOutlined,
} from "@ant-design/icons";
import {
  deleteQuestionFunc,
  getSpecificChallenge,
} from "@src/features/challenges/AllChallenges";
import { ChallengeInterface } from "@src/types/ChallengeInterface";

const QuestionsTab: React.FC = () => {
  const [dataQuestion, setDataQuestion] = useState<QuestionInterface[]>([]);
  const [dataChallenge, setDataChallenge] = useState<ChallengeInterface>();
  const navigate = useNavigate();
  const { id } = useParams();
  const { Title } = Typography;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    fetchQuestion(Number(id));
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const fetchQuestion = async (challenge_id: Number) => {
    try {
      const data = await getAllQuestionsOfChallenge(challenge_id);
      setDataQuestion(data);
    } catch (error) {
      console.error("Error fetching all news", error);
    }
  };

  const detailChallenge = async (challenge_id: Number) => {
    try {
      const data = await getSpecificChallenge(challenge_id);
      setDataChallenge(data.data);
    } catch (error) {
      console.error("Error fetching all news", error);
    }
  };

  const handleDelete = async (challenge_id: Number, quesiton_id: Number) => {
    try {
      const data = await deleteQuestionFunc(challenge_id, quesiton_id);
      showModal();
    } catch (error) {
      console.error("Error fetching all news", error);
    }
  };
  useEffect(() => {
    detailChallenge(Number(id));
    fetchQuestion(Number(id));
  }, []);

  return (
    <CustomProvider>
      <Row gutter={16}>
        <Col span={6}>
          <Card
            style={{ borderRadius: 12 }}
            cover={
              <div
                style={{ padding: 24, display: "flex", alignItems: "center" }}
              >
                <img
                  src={dataChallenge?.image_url}
                  alt="challenge"
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 12,
                    marginRight: 16,
                  }}
                />
                <div>
                  <Title level={3} style={{ margin: 0 }}>
                    {dataChallenge?.title}
                  </Title>
                  <p className="text-blue-400 font-medium">
                    LeetCode · {dataQuestion.length} questions
                  </p>
                </div>
              </div>
            }
          >
            <div style={{ marginTop: 12 }}>
              <Space>
                <Button
                  type="primary"
                  icon={<PlayCircleOutlined />}
                  shape="round"
                >
                  Practice
                </Button>
                <Button shape="circle" icon={<StarOutlined />} />
                <Button shape="circle" icon={<ExportOutlined />} />
              </Space>
            </div>
            <Divider />
            <Button type="link" icon={<MessageOutlined />}>
              Discuss
            </Button>
          </Card>
        </Col>
        <Col span={18}>
          <Button
            type="primary"
            onClick={() => navigate(`/challenge/${id}/create`)}
          >
            Add Question
          </Button>

          <List
            itemLayout="horizontal"
            dataSource={dataQuestion}
            renderItem={(item, index) => (
              <List.Item className="font-medium">
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
                <DeleteOutlined
                  onClick={() => handleDelete(item.challenge_id, item.id)}
                />
              </List.Item>
            )}
          />
        </Col>
      </Row>
      <Modal
        title="Delete success"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      ></Modal>
    </CustomProvider>
  );
};

export default QuestionsTab;
