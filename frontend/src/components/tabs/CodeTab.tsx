import React, { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import { Button, Col, Modal, Result, Row, Select, Tabs } from "antd";
import CustomProvider from "../shared/CustomProvider";
import { QuestionInterface } from "@src/types/QuestionInterface";
import {
  createSubmissionFunc,
  getSpecificQuestion,
} from "@src/features/questions/AllQuestions";
import CustomTag from "../shared/CustomTag";
import { useNavigate, useParams } from "react-router-dom";
import { CreateSubmissionInterface } from "../../types/SubmissionInterface";
import { useCookies } from "react-cookie";

const headers = {
  "content-type": "application/json",
  "X-RapidAPI-Key": "a2e4f9a93emsh4d44785d58d1596p10e189jsn3407afbe40dc",
  "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
};
const CodeTab: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // id chính là challenge_id
  const [cookies] = useCookies([]);
  const [jwt, setJwt] = useState(cookies.jwt);
  const [activeKey, setActiveKey] = useState("1");
  const [items, setItems] = useState<any[]>([]);
  const [ok, setOk] = useState("");
  const [passed, setPassed] = useState<Boolean>();
  const [output, setOutput] = useState<string>("");
  const [code, setCode] = useState<string>(``);
  const [dataQuestion, setDataQuestion] = useState<QuestionInterface>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleGoBackChallenge = () => {
    setIsModalOpen(false);
    navigate("/home");
  };

  const handleSubmit = async (
    payload: CreateSubmissionInterface,
    question_id: Number
  ) => {
    try {
      const res = await createSubmissionFunc(payload, question_id, jwt);
      const { results, status } = res.data;

      setOk(status);
      setOutput(JSON.stringify(results, null, 2));
      setPassed(status === "Accepted");
      showModal();
    } catch (error) {
      console.error("Submit failed", error);
      setOk("Failed");
      setOutput("Error occurred");
      setPassed(false);
      showModal();
    }
  };

  const fetchQuestion = async (question_id: Number) => {
    try {
      const data = await getSpecificQuestion(question_id);
      setDataQuestion(data);
      console.log(data?.id);
      setCode(data?.starter_code);
      const data1 = data?.test_cases;
      const formatted = data1.map((tc, index) => ({
        label: `Testcase ${index + 1}`,
        key: `${index + 1}`,
        children: (
          <>
            <p>
              <strong>Input:</strong> {tc.input}
            </p>
            <p>
              <strong>Expected Output:</strong> {tc.expect_output}
            </p>
          </>
        ),
      }));
      setItems(formatted);
      if (formatted.length > 0) setActiveKey(formatted[0].key);
    } catch (error) {
      console.error("Error fetching all news", error);
    }
  };

  useEffect(() => {
    fetchQuestion(Number(id));
  }, []);

  return (
    <CustomProvider>
      <Row gutter={16}>
        <Col span={10}>
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">
              {dataQuestion?.id ? dataQuestion.id.toString() : "N/A"}
              {". "}
              {dataQuestion?.title}
            </h2>
            {/* <CustomTag category={dataQuestion?.level} /> */}
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-1">
                Description
              </h3>
              <p className="text-gray-600 whitespace-pre-wrap">
                {dataQuestion?.description}
              </p>
            </div>
          </div>
        </Col>

        <Col span={14}>
          <Select
            defaultValue="71"
            onChange={handleChange}
            options={[
              { value: "71", label: "Python (3.8.1)" },
              { value: "29", label: "JavaScript (nodejs 8.5.0)" },
              { value: "27", label: "Java (OpenJDK 8)" },
              { value: "22", label: "Go (1.9)" },
              { value: "54", label: "C++ (GCC 9.2.0)" },
            ]}
          />
          {/* <Button onClick={runAllTestCases}>Run Code</Button> */}
          <Button
            onClick={() =>
              handleSubmit(
                {
                  code: code,
                  status: "Pending",
                  language_id: 71,
                },
                dataQuestion?.id
              )
            }
          >
            Submit
          </Button>
          <Editor
            height="300px"
            defaultLanguage="python"
            defaultValue={code}
            onChange={(value) => setCode(value || "")}
          />

          <pre className="mt-4 bg-gray-100 p-2">{output}</pre>
          <div className="bg-white my-4 p-4 rounded-2xl">
            <p className="font-medium pb-4">Testcase</p>
            <Tabs
              type="editable-card"
              activeKey={activeKey}
              onChange={setActiveKey}
              items={items}
            />
          </div>
          <div className="bg-white my-4 p-4 rounded-2xl">
            <span className="font-medium pb-4">
              Result{" "}
              <span
                className={`font-medium text-xl ${
                  ok === "Accepted" ? "text-green-500" : "text-red-500"
                }`}
              >
                {ok}
              </span>
            </span>
          </div>
        </Col>
      </Row>

      <Modal
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        {passed ? (
          <Result
            status="success"
            title="Your Solution Passed!!"
            extra={[
              <Button type="primary" onClick={handleGoBackChallenge}>
                Go back Challenge
              </Button>,
              <Button key="buy" onClick={handleOk}>
                OK
              </Button>,
            ]}
          />
        ) : (
          <Result status="error" title="Submission Failed" />
        )}
      </Modal>
    </CustomProvider>
  );
};

export default CodeTab;
