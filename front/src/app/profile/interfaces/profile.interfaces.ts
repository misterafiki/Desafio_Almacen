export interface GetUserDataResponse {
  msg:    string;
  data?:   userData;
  status: boolean;
}

export interface userData {
  email: string;
  name:  string;
  img:   string;
}

export interface standardResponse {
  msg:    string;
  status: boolean;
}
