export interface User {
  uid: string;
  name: string;
}

export interface PeopleListResponse {
  Count: number;
  Items: PeopleListItem[];
}

export interface PeopleListItem {
  uid: {
    S: string;
  };
  name: {
    S: string;
  };
}

export interface ConversationListResponse {
  Count: number;
  Items: ConversationListItem[];
}

export interface ConversationListItem {
  id: {
    S: string;
  };
  companionID: {
    S: string;
  };
}
