import axios from "axios";

export interface UserDocument {
  _id: string;
  name: {
    first: string;
    last: string;
  };
  email: string;
}

axios.defaults.baseURL = "https://dev.jacobianmatthews.com/api";

export const UsersService = {
  getAll: async () => {
    return axios.get("/users");
  },
  get: async (id: string) => {
    return axios.get(`/users/${id}`);
  },
  create: async (user: Partial<UserDocument>) => {
    return axios.post("/users", { ...user });
  },
  update: async (id: string, update: Partial<UserDocument>) => {
    return axios.put(`/users/${id}`, { ...update });
  },
  delete: async (id: string) => {
    return axios.delete(`/users/${id}`);
  },
};
