import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosRequestHeaders,
} from "axios";
import { config } from "dotenv";
import { response } from "express";

const accessToken: string | null = localStorage.getItem("accessToken");

const localstorageUserInfo = JSON.parse(
  localStorage.getItem("subgatherUserInfo") || "{}"
);

const today: number = Math.floor(Date.now() / 1000);

export const instance: AxiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URI}/`,
  timeout: 5000,
  headers: {
  "Content-type": "application/json",
  authorization: `Bearer ${accessToken}`,
},

});


//axios interceptor를 사용하여 요청전에 accesstoken

instance.interceptors.request.use((config:any) => {

  console.log(localstorageUserInfo.accessExp-today)
    
  
  console.log(config)

 const issueToken =  instance.post( localstorageUserInfo.id
  )

  console.log(issueToken)



  return config
},
(error) =>{
  Promise.reject(error)
}


);

// instance.interceptors.response.use(
//   (response) =>{
//     return response
//   },
//   async (error) =>{

//   const originalRequest = error.config

//   console.log(originalRequest)

//   if(error.response.status===401 && originalRequest.url ==='auth/issueaccess'){

//     //refresh token expired

//     localStorage.clear();
//     // window.location.assign('/')
//     return Promise.reject(error)
//   }

//   if(error.response.status===401 && !originalRequest._retry){
//     originalRequest._retry = true;

//     console.log('액세스 토큰 재발급')

//     return

//   }

//   return Promise.reject(error)



//   }
// )

// async function reissuetoken (){

//   axios.post(`${process.env.REACT_APP_API_URI}/auth/issueaccess`, {
//     id:localstorageUserInfo.id,
//     headers: {
//       authorization: `Bearer ${accessToken}`,
//     },
//   }
//   body: JSON.stringify({)
// fetch(`${process.env.REACT_APP_API_URI}/auth/issueaccess`, {
//   body: JSON.stringify({
//     id: localstorageUserInfo.id,
//   }),
//   method: "post",
//   headers: {
//     authorization: `Bearer ${accessToken}`,
//   },
//   credentials: "include",
// })
//   .then((res: any) => {
//     if (!res.ok) {
//       //accesstoken을 보냈더니 refreshk 가만료면 로그아웃을 한다.
//       persistLogin(false);

//       localStorage.removeItem("accessToken");
//       // alert("로그인이 만료되었습니다. 다시 로그인해주세요");
//       isSigninState.persist.clearStorage();
//       localStorage.removeItem("subgatherUserInfo");
//       window.location.assign("/");

//       throw new Error(res.status);
//     }

//     return res.json();
//   })
//   .then((result) => {
//     //accesstoken을 보냈더니 기간만료 전이야 그러면 재발급
//     localStorage.setItem("accessToken", result.accessToken);
//     //res.data
//     localStorage.setItem(
//       "subgatherUserInfo",
//       JSON.stringify(result.data)
//     );
//     // setTokenExpired(result.accessToken);
//   })
//   .catch((err) => {
//     //accessToken 을 보냈을때 기간만료인경우 로그아웃        // setUserSi
//   });
//   }
// }
