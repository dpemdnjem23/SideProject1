import axios from "axios";
import React, { useEffect,useState } from "react";

import "../../css/components/WalletPage/walletPageTop.css";
const WalletPageTop = () => {

 const [walletPeriod,setWalletPeriod] =  useState<string[]>([])

 const [walletImageInfo,setWalletImageInfo] = useState<string[]>([])
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URI}/wallet/toptwo`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${accessToken}`,
      },
    }).then((res)=>{

      // console.log(res.data.data[0].end_date.substr(5,2))
      // console.log(res.data.data[0].end_date.substr(8,2))

      

      setWalletPeriod(res.data.data)
      setWalletImageInfo(res.data.wallet)
      // console.log(walletPeriod)

    }).catch((err)=>{
console.log(err)
    })
  }, []);

  //갱신기간은 어떻게? 똑같은 것끼리 top2
  //가장빠른 end_date 2개만 가져온다
  //end_date에 해당하는 구독을 표시한다. 어떻게? 몰라 일단해봐
  // end_date를 찾고
  return (
    <>
      <div className="WalletPage_Top_section_sub_title">
        <p>xxx, 갱신이 얼마 남지 않았어요!</p>
      </div>
      <div className="WalletPage_Top_section">
        {/* <span>6/29</span> */}
         {/* { walletImageInfo.map((el2)=>{ */}
    
         <div  className="WalletPage_Top_section_sub">
            
          <span>{walletPeriod[0].end_date.substr(5,2)+'월 '+el.end_date.substr(8,2)+'일'}</span>
          </div>
        {/* })
                
      }) */}



        }
     
      </div>
    </>
  );
};

export default WalletPageTop;
