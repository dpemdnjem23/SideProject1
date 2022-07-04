import React ,{useEffect}from 'react'
import { isSigninState } from 'utils/state';
import axios from 'axios'
// import { useNavigate } from 'react-router';

const CallbackPage = () =>{
// const navigate = useNavigate()

  const{ persistLogin} =isSigninState()
  const url = new URL(window.location.href);

  const searchs = url.search;

  useEffect(() => {
    console.log(url.pathname);
    if (url.pathname === "/callback/kakao") {
      const code: string | null = searchs.split("=")[1].split("&")[0];
      console.log(code);

      axios
        .post(
          `${process.env.REACT_APP_API_URI}/auth/kakao`,
          { code: code },

          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((data) => {
          // navigate("/");
          localStorage.setItem("accessToken", data.data.accessToken);
          persistLogin(true);
        })
        .catch((err) => {
          console.log(err);

          persistLogin(false);
        });
    }
  }, []);


    return(
        <div>



        </div>
    )
}

export default CallbackPage