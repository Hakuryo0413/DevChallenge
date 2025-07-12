import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  Flex,
  Typography,
  Divider,
  ConfigProvider,
  Space,
} from "antd";

import Logo from "@src/assets/logo";
import Google from "@src/assets/googleLogo";
import LinkedIn from "@src/assets/linkedln";
import Facebook from "@src/assets/facebookLogo";
import { UserRegisterPayload } from "@src/types/UserInterface";
import { registerFunc } from "@src/features/auth/Register";
import { Link, useNavigate } from "react-router-dom";
import { Image } from "antd";

const Signup: React.FC = () => {
  const navigate = useNavigate();

  const register = async (payload: UserRegisterPayload) => {
    try {
      await registerFunc(payload);
      navigate("/login");
    } catch (error) {
      console.error("Error siging up", error);
      alert("Registration failed: An error occurred. Please try again.");
    }
  };

  const onFinish = (values: UserRegisterPayload) => {
    console.log("Received values of form: ", values);
    register(values);
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            colorPrimary: "black",
          },
          Divider: {
            colorText: "white",
            colorSplit: "gray",
          },
        },
      }}
    >
      <div className="flex justify-center py-4 text-white">
        <div className="bg-[#B75A4A] p-8 rounded-2xl">
          {/* Logo and Header */}
          <div className="mb-4 mt-2 text-center">
            <div className="flex justify-center">
              <Image
                width={70}
                src="https://res-console.cloudinary.com/dkglfu0md/media_explorer_thumbnails/b3a4c29fcb81b1f2fbe0769f4cd8e33a/detailed"
                preview={false}
                className="mt-4"
              />
            </div>
            <p className="my-4 text-3xl text-white"> Sign up to get started</p>
            <p className="text-sm font-medium">
              Transform your photos into talking digital people
            </p>
          </div>

          {/* Social Login Buttons */}
          <Space direction="vertical" size="small" style={{ width: "100%" }}>
            {[
              { icon: <Google />, text: "Continue with Google" },
              { icon: <LinkedIn />, text: "Continue with LinkedIn" },
              { icon: <Facebook />, text: "Continue with Facebook" },
            ].map(({ icon, text }, index) => (
              <Button key={index} className="w-full !justify-start">
                <Flex align="center" gap={8}>
                  {React.cloneElement(icon, { style: { fontSize: "20px" } })}
                  <span className="font-light">{text}</span>
                </Flex>
              </Button>
            ))}
          </Space>

          <Divider plain>OR</Divider>

          {/* Login Form */}
          <Form
            name="login"
            initialValues={{ remember: true }}
            style={{ maxWidth: 360 }}
            onFinish={onFinish}
          >
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please input your Email!" }]}
            >
              <Input prefix={<UserOutlined />} placeholder="Email" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input
                prefix={<LockOutlined />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                block
                htmlType="submit"
                className="!text-white"
              >
                Register
              </Button>
            </Form.Item>

            <Form.Item style={{ marginTop: "20px", textAlign: "center" }}>
              <span className="text-white">
                Already have an account?{" "}
                <Link to="/login" className="!text-orange-400">
                  Log in now!
                </Link>
              </span>
            </Form.Item>
          </Form>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default Signup;
