import React,{useState,useEffect} from 'react'
// import 


const ManageBoardContents=() =>{


    const localstorageUserInfo = JSON.parse(
        localStorage.getItem("subgatherUserInfo") || "{}"
      );
      //갯수만큼
    
      //   instance
      //     .get("/share/selectifno", {})
      //     .then((res) => {})
      //     .catch((err) => {});

    return(
        <div className='ManageBoardContents' >

        </div>
    )



}
export default ManageBoardContents