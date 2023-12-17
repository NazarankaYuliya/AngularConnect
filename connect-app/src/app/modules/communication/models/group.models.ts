export interface Group {
  createdAt: string;
  createdBy: string;
  id: string;
  name: string;
}

export interface GroupListResponce {
  Count: number;
  Items: [
    {
      id: {
        S: string;
      };
      name: {
        S: string;
      };
      createdAt: {
        S: string;
      };
      createdBy: {
        S: string;
      };
    }
  ];
}

export interface CreateGroupResponce {
  groupID: string;
}

export interface GroupMessagesResponse {
  Count: number;
  Items: [
    {
      authorID: {
        S: string;
      };
      createdAt: {
        S: string;
      };

      message: {
        S: string;
      };
    }
  ];
}

export interface Message {
  authorID: string;
  createdAt: string;
  message: string;
}
