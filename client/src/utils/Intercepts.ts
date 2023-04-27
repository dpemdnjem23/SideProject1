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

// const instance = axios.create({
//   baseURL: `${process.env.REACT_APP_API_URI}`,
//   timeout: 5000,
// });

// export default instance
const useAxiosInterceptors = () => {
  useEffect(() => {
    const requestInstance: any = axios.interceptors.request.use(
      async (config: AxiosRequestConfig) => {
        const accessToken: string | null = localStorage.getItem("accessToken");

        config.headers = {
          Authorization: `Bearer ${accessToken}`,
        };

        if (accessToken) {
          // accessToken이 있는 경우, 요청 헤더에 추가합니다.

          if (config.url === "/auth/signout") {
            axios.interceptors.request.eject(requestInstance);
            axios.interceptors.response.eject(responseInstance);
            return config;
          }
        }

        return config;
      },
      async (error) => {
        return Promise.reject(error);
      }
    );

    const responseInstance = axios.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const originalRequest = error.config;

        // console.log(
        //   originalRequest._retry,
        //   localstorageUserInfo.accessExp < today
        // );

        if (!originalRequest._retry && localstorageUserInfo.accessExp < today) {
          originalRequest._retry = true;

          return axios
            .post(
              `${process.env.REACT_APP_API_URI}/auth/issueaccess`,
              {
                id: localstorageUserInfo.id,
              },
              {
                headers: {
                  authorization: `Bearer ${accessToken}`,
                },
              }
            )
            .then((res) => {
              console.log("일로와");
              localStorage.setItem("accessToken", res.data.accessToken);
              //         //res.data
              localStorage.setItem(
                "subgatherUserInfo",
                JSON.stringify(res.data.data)
              );

              axios.defaults.headers.common[
                "Authorization"
              ] = `Bearer ${res.data.accessToken}`;

              return axios.request(originalRequest);

              //  axios.request(originalRequest);

              // setTokenExpired(result.accessToken);
              // return instance(originalRequest);

              //다시 요청
            })
            .catch((err) => {
              //refreshToken이 만료가된경우 로그아웃을 한다 -> 만료

              axios
                .get(`${process.env.REACT_APP_API_URI}/auth/signout`, {
                  headers: {
                    authorization: `Bearer ${accessToken}`,
                  },
                })

                .then((res) => {
                  //리프레쉬 토큰이 없는경우 로그아웃을 해야한다.
                  // window.location.replace("/");

                  persistLogin(false);
                  console.log("tjfps");

                  window.alert("로그인이 만료되었습니다. 다시 로그인해주세요");
                  localStorage.clear();
                  isSigninState.persist.clearStorage();

                  // navigate("/");
                  // cancelTokenSource.cancel();
                  // return Promise.reject(error);
                })
                .catch((err) => {
                  console.error(err);

                  persistLogin(false);
                  // showMypageModalOn(false);

                  localStorage.removeItem("accessToken");
                  isSigninState.persist.clearStorage();
                  localStorage.removeItem("subgatherUserInfo");
                });
            });
        }
        // }

        //에러로 내보낸다.
        return Promise.reject(error);
      }
    );
    return () => {
      axios.interceptors.request.eject(requestInstance);
      axios.interceptors.response.eject(responseInstance);
    };
  }, []);
};

export default useAxiosInterceptors

// export {requestInstance,responseInstance}
