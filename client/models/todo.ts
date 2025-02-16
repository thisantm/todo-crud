export interface TodoResponse {
  id: number;
  title: string;
  description: string;
  status: string;
  created_at: Date;
  updated_at: Date;
}

export interface TodoRequest {
  title: string;
  description: string;
  status: string;
}
