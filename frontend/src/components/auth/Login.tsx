import React, { useEffect } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  Flex,
  Divider,
  ConfigProvider,
  Space,
} from "antd";

import Logo from "@src/assets/logo";
import LinkedIn from "@src/assets/linkedln";
import Facebook from "@src/assets/facebookLogo";
import Google from "@src/assets/googleLogo";
import { UserLoginPayload } from "@src/types/UserInterface";
import { loginFunc } from "@src/features/auth/Login";
import { Link } from "react-router-dom";
import { Image } from "antd";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

interface CookieValues {
  jwt?: string;
}

const Login: React.FC = () => {
  const [cookies, setCookie] = useCookies<"jwt", CookieValues>(["jwt"]);
  const navigate = useNavigate();

  useEffect(() => {
    if (cookies.jwt) {
      navigate("/home");
    }
  }, []);
  const login = async (payload: UserLoginPayload) => {
    try {
      const data = await loginFunc(payload);
      const jwt = data.headers.get("Authorization");
      setCookie("jwt", jwt);
      navigate("/home");
    } catch (error) {
      alert("Login failed: An error occurred. Please try again.");
    }
  };

  const onFinish = async (values: UserLoginPayload) => {
    await login(values);
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            colorPrimary: "orange",
          },
          Divider: {
            colorText: "white",
            colorSplit: "gray",
          },
        },
      }}
    >
      <div className="flex justify-center py-12 text-white">
        <div className="bg-[#B75A4A] p-10 rounded-2xl">
          <div className="mb-4 mt-2 text-center">
            <div className="flex justify-center">
              {/* <Image
                width={70}
                src="https://res-console.cloudinary.com/dkglfu0md/media_explorer_thumbnails/b3a4c29fcb81b1f2fbe0769f4cd8e33a/detailed"
                preview={false}
                className="mt-4"
              /> */}
            </div>
            <p className="my-4 text-3xl text-white">Log in to LeetCode</p>
            <p className="text-sm font-medium">
              Turn your code into career-changing skills.
            </p>
          </div>

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

          <Divider plain>
            <p>OR</p>
          </Divider>

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
                className="!text-black"
              >
                Log in
              </Button>
            </Form.Item>

            <Form.Item style={{ marginTop: "20px", textAlign: "center" }}>
              <span className="text-white">
                Don't have an account?{" "}
                <Link to={"/signup"} className="!text-orange-400">
                  Register now!
                </Link>
              </span>
            </Form.Item>
          </Form>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default Login;
