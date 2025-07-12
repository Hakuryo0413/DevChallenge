import configKeys from "./config";

const apiConfig = {
  userLogin: `${configKeys.API_URL}login`,
  userRegister: `${configKeys.API_URL}signup`,
  userLogout: `${configKeys.API_URL}logout`,
  userDetail: `${configKeys.API_URL}/api/v1/users`,

  allChallenges: `${configKeys.API_URL}/api/v1/challenges`,
  specificChallenge: `${configKeys.API_URL}/api/v1/challenges`,

  allQuestions: `${configKeys.API_URL}/api/v1/questions`,
  allQuestionsOfChallenge: `${configKeys.API_URL}/api/v1/challenges`,
  specificQuestion: `${configKeys.API_URL}/api/v1/questions`,
  createQuestion: `${configKeys.API_URL}/api/v1/challenges`,
  deleteQuestion: `${configKeys.API_URL}/api/v1/challenges`,

  allTestCase: `${configKeys.API_URL}/api/v1/questions`,
  createSubmission: `${configKeys.API_URL}/api/v1/questions`,

  userLeaderBoard: `${configKeys.API_URL}/api/v1/users`,
};

export default apiConfig;
