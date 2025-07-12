import { UserLoginPayload } from "@src/types/UserInterface";
import apiConfig from "@src/utils/apiConfig";

export const loginFunc = async (payload: UserLoginPayload): Promise<any> => {
  const response = await fetch(apiConfig.userLogin, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user: payload }),
  });

  return response;
};

export const logoutFunc = async (jwtToken: string): Promise<any> => {
  const response = await fetch(apiConfig.userLogout, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: jwtToken,
    },
  });
  return response;
};
