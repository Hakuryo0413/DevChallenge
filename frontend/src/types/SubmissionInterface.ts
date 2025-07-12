export interface SubmissionInterface {
  code: string;
  status: string;
  points: Number;
  created_at: Date;
  updated_at: Date;
}

export interface CreateSubmissionInterface {
  code: string;
  status: string;
  language_id: Number;
}
