import axios, { AxiosRequestConfig, AxiosRequestHeaders } from "axios";
import { config } from "dotenv";


const accessToken: string | null = localStorage.getItem("accessToken");

const localstorageUserInfo = JSON.parse(
  localStorage.getItem("subgatherUserInfo") || "{}"
);

const today: number = Math.floor(Date.now() / 1000);

console.log(localstorageUserInfo.accessExp-today)

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URI}/`,

});

// headers: {
//   "Content-type": "application/json",
//   authorization: `Bearer ${accessToken}`,
// },

//axios interceptor를 사용하여 요청전에 accesstoken
instance.interceptors.request.use(

    async (config:any)=>{

      if(localstorageUserInfo.accessExp<=today){
        const newToken:any = await fetchNewToken();

        localStorage.setItem("accessToken", newToken.accessToken);
        //res.data
        localStorage.setItem(
          "subgatherUserInfo",
          JSON.stringify(newToken.data)
        );


      //요철을 보내기전
        
    }

    config.headers.Authorization =`Bearer ${accessToken}`

   return config
  },
  (error) => {
    return Promise.reject(error);
  }

    




)

async function fetchNewToken() {
  try {
    const response = await instance.post('/auth/reissueaccess');

    console.log(response)

return {
  accessToken: response.data.accessToken,
  data: response.data.data,
};

  } catch (error) {
    console.log(error);
  }
}


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
