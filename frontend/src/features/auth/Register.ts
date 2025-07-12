import { UserRegisterPayload } from "@src/types/UserInterface";
import apiConfig from "@src/utils/apiConfig";

export const registerFunc = async (
  payload: UserRegisterPayload
): Promise<any> => {
  const response = await fetch(apiConfig.userRegister, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user: payload }),
  });
  const res = await response.json();
  console.log("Register response:", res);
  return res;
};
