export interface Conversation {
  id: number;
  messages?: Messages[];
  category: string;
  icon: string;
}

export interface Messages {
  message: string;
  sender: string;
}
