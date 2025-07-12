export interface UserInterface {
  user_id: string;
  full_name: string;
  email: string;
  is_active: string;
  role: string;
  last_login: string;
  created_at: Date;
  updated_at: Date;
  total_points: Number;
}

export interface UserLoginPayload {
  email: string;
  password: string;
}

export interface UserRegisterPayload {
  email: string;
  password: string;
}

export interface UserDetail {
  user_id: string;
  full_name: string;
  email: string;
  is_active: boolean;
  role: string;
  last_login: Date;
}
