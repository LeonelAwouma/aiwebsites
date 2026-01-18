export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: string[];
};

export type WebsiteSource = {
  id: string;
  name: string;
  url: string;
  isActive: boolean;
};

export type DatabaseType = "postgresql" | "mysql" | "firestore";

export type DatabaseConnection = {
  id: string;
  name: string;
  type: DatabaseType;
  host: string;
  port: number;
  user: string;
  dbname: string;
  password?: string;
};
