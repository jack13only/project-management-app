export type SigninType = {
  login: string;
  password: string;
};

export type SignupType = {
  name: string;
  login: string;
  password: string;
};

export type BoardType = {
  title: string;
};

export type ColumnType = {
  title: string;
  order?: number;
};
