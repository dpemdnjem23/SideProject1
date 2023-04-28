import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosRequestHeaders,
} from "axios";
import { config } from "dotenv";
import { useEffect } from "react";
import { isSigninState } from "./state";
axios.defaults.withCredentials = true;

axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.get["Content-Type"] = "application/json";
const accessToken: string | null = localStorage.getItem("accessToken");

const localstorageUserInfo = JSON.parse(
  localStorage.getItem("subgatherUserInfo") || "{}"
);

const today: number = Math.floor(Date.now() / 1000);

const { persistLogin } = isSigninState();

//axios interceptor를 사용하여 요청전에 accesstoken

const axiInstance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URI}`,
  timeout: 5000,
});

export default axiInstance

// export default instance
// const useAxiosInterceptors = () => {
//   useEffect(() => {
 
//     );
//     return () => {
//       axios.interceptors.request.eject(requestInstance);
//       axios.interceptors.response.eject(responseInstance);
//     };
//   }, []);
// };

// export default useAxiosInterceptors

// export {requestInstance,responseInstance}
