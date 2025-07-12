export interface TestcaseInterface {
  id: Number;
  question_id: Number;
  input: string;
  expect_output: string;
  is_hidden: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface CreateTestcaseInterface {
  input: string;
  expect_output: string;
  is_hidden: boolean | false;
}
