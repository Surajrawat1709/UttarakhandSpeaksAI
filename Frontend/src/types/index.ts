// ─── Message Types ─────────────────────────────────────────────────────────────
export interface Message {
  id: string;
  sender: MessageType;
  content: string;
  dateTime: Date;
}

export enum MessageType {
  USER = 'user',
  ASSISTANT = 'assistant',
}

// ─── API Response Types ─────────────────────────────────────────────────────────
export interface QueryPromptResponse {
  response: string;
}

export interface LoginResponse {
  token: string;
}

export interface CreateOrderResponse {
  secretId: string;
  razorpayOrderId: string;
  applicationFee: string;
  pgName: string;
}

// ─── Character Types ────────────────────────────────────────────────────────────
export interface Character {
  name: string;
  image: string;
  Desc: string;
}

// ─── Form Types ─────────────────────────────────────────────────────────────────
export interface AuthRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export interface PaymentForm {
  name: string;
  email: string;
  phone: string;
  amount: string;
}

// ─── App State Types ────────────────────────────────────────────────────────────
export interface AppState {
  username: string;
  animeName: string;
  currentImage: string;
}
