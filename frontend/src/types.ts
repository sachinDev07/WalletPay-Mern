export type LabelProps = {
  label: string;
};

export interface ValidationError {
  error: {
    message: string;
  }[];
  message: string;
  errors: Record<string, string[]>;
}

export type FormData = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
};

export type UserDetails = {
  message: string;
};

export type SignUpRequestPayload = FormData;

export type SignUpResponse = {
    success: boolean;
    message: string;
};

export type SignInRequesPayload = {
  email: string;
  password: string;
}

export type SignInResponse = {
  token: string;
  data: {
    id: string;
    role: string;
    firstname: string;
    lastname: string;
    email: string;
  };
  message: string;
};
