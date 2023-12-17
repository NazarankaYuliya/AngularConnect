export interface MessagesResponse {
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
