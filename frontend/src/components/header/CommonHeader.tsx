import { Disclosure } from "@headlessui/react";
import React, { useState } from "react";
import { Image } from "antd";
import { useCookies } from "react-cookie";
import { logoutFunc } from "@src/features/auth/Login";
import { useNavigate } from "react-router-dom";

function CommonHeader() {
  const [cookies, setCookies, removeCookies] = useCookies([]);
  const [jwt, setJwt] = useState(cookies.jwt);
  const navigate = useNavigate();

  const handleLogout = async (e: any) => {
    console.log(jwt);
    const res = await logoutFunc(cookies.jwt);
    handleResponse(res);
    navigate("/login");
  };

  const handleLogin = () => {
    navigate("/login");
  };
  const handleResponse = async (res: any) => {
    if (res.status == 200) {
      removeCookies("jwt");
    } else {
      removeCookies("jwt");
    }
    setJwt(null);
  };
  return (
    <Disclosure as="nav" className="bg-background z-50">
      {({ open }) => (
        <>
          <div className="lg:mx-2 mx-auto px-4 md:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <a
                href="/home"
                className="text-black flex text-bold text-4xl font-logo"
              >
                <Image
                  width={36}
                  src="https://cdn.iconscout.com/icon/free/png-256/free-leetcode-logo-icon-download-in-svg-png-gif-file-formats--technology-social-media-vol-4-pack-logos-icons-2944960.png?f=webp"
                  preview={false}
                />
              </a>

              <div className="absolute right-0 flex lg:relative lg:block">
                {!jwt ? (
                  <>
                    <Disclosure.Button className="flex items-center float-right rounded-lg p-2 hover:text-currentText focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                      <a href="/signup" className="font-bold">
                        Register
                      </a>
                    </Disclosure.Button>
                    <Disclosure.Button
                      onClick={handleLogin}
                      className="flex items-center float-right rounded-lg p-2 hover:text-currentText  focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    >
                      <p className="font-bold">Log in</p>
                    </Disclosure.Button>
                  </>
                ) : (
                  <>
                    <Disclosure.Button
                      onClick={handleLogout}
                      className="flex items-center float-right rounded-lg p-2 hover:text-currentText  focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    >
                      <p className="font-bold">Log out</p>
                    </Disclosure.Button>
                    <Disclosure.Button className="flex items-center float-right rounded-lg p-2 hover:text-currentText focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                      <a href="/profile" className="font-bold">
                        {jwt && "Profile"}
                      </a>
                    </Disclosure.Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
}

export default CommonHeader;
export {};
