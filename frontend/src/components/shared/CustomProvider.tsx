import React, { ReactNode } from "react";
import { ConfigProvider } from "antd";

interface CustomProviderProps {
  children: ReactNode;
}

const CustomProvider: React.FC<CustomProviderProps> = ({ children }) => (
  <ConfigProvider
    theme={{
      components: {
        Table: {
          cellPaddingBlock: 8,
          headerBg: "#E86151",
          headerColor: "white",
        },
      },
    }}
  >
    {children}
  </ConfigProvider>
);

export default CustomProvider;
