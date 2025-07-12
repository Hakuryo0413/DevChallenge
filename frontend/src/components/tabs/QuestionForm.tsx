import React, { useState } from "react";
import {
  Button,
  Input,
  Form,
  ConfigProvider,
  Select,
  Space,
  InputNumber,
} from "antd";
import {
  LeftOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import { CreateQuestionInterface } from "@src/types/QuestionInterface";
import { createQuestionFunc } from "@src/features/questions/AllQuestions";
import { Editor } from "@monaco-editor/react";
import type { InputNumberProps } from "antd";

const { TextArea } = Input;

const QuestionForm: React.FC = () => {
  let navigate = useNavigate();
  const { id } = useParams();
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  const onChange: InputNumberProps["onChange"] = (value) => {
    console.log("changed", value);
  };
  const [code, setCode] = useState<string>(``);

  const createQuestionFunction = async (payload: CreateQuestionInterface) => {
    try {
      await createQuestionFunc(payload, Number(id));
      navigate(`/challenge/${id}`);
    } catch (error) {
      console.error("Error creating question", error);
      alert("Failed to create question: An error occurred. Please try again.");
    }
  };

  const onFinish = (values: CreateQuestionInterface) => {
    console.log("Received values of form: ", values);
    createQuestionFunction(values);
    // window.location.href = `/challenge/${id}`;
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Form: {
            labelColor: "black",
          },
          Button: {
            colorPrimary: "black",
          },
        },
      }}
    >
      <div className="space-y-6 ">
        <div className="bg-white m-4 p-4 rounded-2xl">
          <Button type="text" onClick={() => navigate(`/challenge/${id}`)}>
            <LeftOutlined />
            Back
          </Button>

          <p className="text-3xl text-center text-black font-medium ">
            Create a new question
          </p>
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item label="Title" className="mb-4" name="title">
              <Input placeholder="Enter title" allowClear />
            </Form.Item>

            <Form.Item label="Description" className="mb-4" name="description">
              <TextArea
                placeholder="Edit your description here"
                rows={6}
                showCount
                allowClear
              />
            </Form.Item>
            <Form.Item
              label="Starter_code"
              className="mb-4"
              name="starter_code"
            >
              <Editor
                height="300px"
                defaultLanguage="python"
                defaultValue={code}
                onChange={(value) => setCode(value || "")}
              />
            </Form.Item>
            <div className="flex justify-between">
              <div>
                <Form.Item label="Level" className="mb-4" name="level">
                  <Select
                    placeholder="Select level"
                    onChange={handleChange}
                    options={[
                      { value: "Easy", label: "Easy" },
                      { value: "Medium", label: "Medium" },
                      { value: "Hard", label: "Hard" },
                    ]}
                  />
                </Form.Item>
                <Form.Item label="Point" className="mb-4" name="points">
                  <InputNumber
                    min={1}
                    max={100}
                    defaultValue={100}
                    onChange={onChange}
                  />
                </Form.Item>
              </div>

              <div>
                <p>Testcase</p>
                <Form.List name="test_cases_attributes">
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name, ...restField }) => (
                        <Space
                          key={key}
                          style={{ display: "flex", marginBottom: 8 }}
                          align="baseline"
                        >
                          <Form.Item
                            {...restField}
                            name={[name, "input"]}
                            className="w-full"
                            rules={[
                              { required: true, message: "Missing input" },
                            ]}
                          >
                            <TextArea placeholder="Input" />
                          </Form.Item>
                          <Form.Item
                            {...restField}
                            name={[name, "expect_output"]}
                            rules={[
                              {
                                required: true,
                                message: "Missing expected output",
                              },
                            ]}
                          >
                            <TextArea placeholder="Expect Output" />
                          </Form.Item>
                          <MinusCircleOutlined onClick={() => remove(name)} />
                        </Space>
                      ))}
                      <Form.Item>
                        <Button
                          type="dashed"
                          onClick={() => add()}
                          icon={<PlusOutlined />}
                        >
                          Add Testcase
                        </Button>
                      </Form.Item>
                    </>
                  )}
                </Form.List>
              </div>
            </div>
            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default QuestionForm;
