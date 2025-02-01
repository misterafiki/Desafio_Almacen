export interface LoginResponse {
  msg:    string;
  token?:  string;
  roles:  string;
  status: boolean;
}

export interface GetUserDataResponse {
  msg:    string;
  data:   userData;
  status: boolean;
}

export interface userData {
  email: string;
  name:  string;
  img:   string;
}
