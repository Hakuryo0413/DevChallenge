import apiConfig from "@src/utils/apiConfig";

export const getAllChallengs = async (): Promise<any> => {
  try {
    const response = await fetch(apiConfig.allChallenges);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching all news", error);
  }
};

export const getSpecificChallenge = async (
  challenge_id: Number
): Promise<any> => {
  try {
    const response = await fetch(
      `${apiConfig.specificChallenge}/${challenge_id}}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching all news", error);
  }
};

export const deleteQuestionFunc = async (
  challenge_id: Number,
  question_id: Number
): Promise<any> => {
  const response = await fetch(
    `${apiConfig.deleteQuestion}/${challenge_id}/questions/${question_id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const res = await response.json();
  return res;
};
