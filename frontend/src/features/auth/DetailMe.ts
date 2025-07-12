import apiConfig from "@src/utils/apiConfig";

export const getLeaderBoard = async (): Promise<any> => {
  try {
    const response = await fetch(`${apiConfig.userLeaderBoard}`, {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching leaderboard info", error);
  }
};

export const getDetailUser = async (user_id: Number): Promise<any> => {
  try {
    const response = await fetch(`${apiConfig.userDetail}/${user_id}`, {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user info", error);
  }
};
