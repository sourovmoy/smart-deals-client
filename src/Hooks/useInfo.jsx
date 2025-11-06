import { use } from "react";
import { AuthContext } from "../Context/AuthContext";

const useInfo = () => {
  const auth = use(AuthContext);
  return auth;
};
export default useInfo;
