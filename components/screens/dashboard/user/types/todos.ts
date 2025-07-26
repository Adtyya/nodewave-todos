/* eslint-disable @typescript-eslint/no-explicit-any */
export type TodoForm = {
  item: string;
};

export type TogglePayload = {
  id: string;
  mark: "DONE" | "UNDONE";
};

export type TodoItem = {
  id: string;
  item: string;
  userId: string;
  isDone: boolean;
  createdAt: string;
  updatedAt: string;
};

export type TodosResponse = {
  content: {
    entries: TodoItem[];
    totalData: number;
    totalPage: number;
  };
  message: string;
  errors: any[];
};
