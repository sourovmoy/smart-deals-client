import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000",
});

const useAxioInstance = () => {
  return instance;
};

export default useAxioInstance;
