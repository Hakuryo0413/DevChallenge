import { CreateQuestionInterface } from "@src/types/QuestionInterface";
import { CreateSubmissionInterface } from "@src/types/SubmissionInterface";
import apiConfig from "@src/utils/apiConfig";

export const getAllQuestions = async (): Promise<any> => {
  try {
    const response = await fetch(apiConfig.allQuestions);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching all news", error);
  }
};

export const getAllQuestionsOfChallenge = async (
  challenge_id: Number
): Promise<any> => {
  try {
    const response = await fetch(
      `${apiConfig.allQuestionsOfChallenge}/${challenge_id}/questions/specific`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching all news", error);
  }
};

export const getSpecificQuestion = async (
  question_id: Number
): Promise<any> => {
  try {
    const response = await fetch(
      `${apiConfig.specificQuestion}/${question_id}`
    );
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching all news", error);
  }
};

export const getAllTestCases = async (question_id: Number): Promise<any> => {
  try {
    const response = await fetch(
      `${apiConfig.allTestCase}/${question_id}/test_cases`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching all news", error);
  }
};

export const createQuestionFunc = async (
  payload: CreateQuestionInterface,
  challenge_id: Number
): Promise<any> => {
  const response = await fetch(
    `${apiConfig.createQuestion}/${challenge_id}/questions`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );
  const res = await response.json();
  return res;
};

export const createSubmissionFunc = async (
  payload: CreateSubmissionInterface,
  question_id: Number,
  jwtToken: string
): Promise<any> => {
  const response = await fetch(
    `${apiConfig.createSubmission}/${question_id}/submissions`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: jwtToken,
      },
      body: JSON.stringify(payload),
    }
  );
  const res = await response.json();
  return res;
};
