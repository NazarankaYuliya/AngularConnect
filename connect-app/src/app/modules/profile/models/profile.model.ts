export interface ProfileResponse {
  email: {
    S: string;
  };
  name: {
    S: string;
  };
  uid: {
    S: string;
  };
  createdAt: {
    S: string;
  };
}

export interface Profile {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export function mapProfileResponseToProfile(
  response: ProfileResponse
): Profile {
  return {
    id: response.uid.S,
    name: response.name.S,
    email: response.email.S,
    createdAt: response.createdAt.S,
  };
}
