import {
  CreateTestcaseInterface,
  TestcaseInterface,
} from "./TestcaseInterface";

export interface QuestionInterface {
  id: Number;
  title: string;
  description: string;
  starter_code: string;
  test_cases: TestcaseInterface[];
  challenge_id: Number;
  created_at: Date;
  updated_at: Date;
  level: string;
}

export interface CreateQuestionInterface {
  title: string;
  level: string;
  description: string;
  test_cases_attributes: CreateTestcaseInterface[];
  starter_code: string;
  points: Number;
}
