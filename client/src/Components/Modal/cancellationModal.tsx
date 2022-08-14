import React from "react";


import axios from 'axios'
import "../../css/common/modal/cancellationModal.css";
import { useNavigate } from "react-router";


interface cancellationModal {
clickModalNum:number
    closeCancellationModal: () =>void
}

const CancellationModal:React.FC<cancellationModal> = ({closeCancellationModal,clickModalNum}) => {


  const navigate = useNavigate()
  const accessToken:string|null = localStorage.getItem('accessToken')

  const handleDelete = () =>{
  
      axios.delete(`${process.env.REACT_APP_API_URI}/wallet/eliminate`,{
        data:{
          id:clickModalNum
  
        },
        headers:{
          'Content-Type':'application/json',
          authorization:`Bearer ${accessToken}`
        
      },withCredentials:true}
      )
      .then((res)=>{

        navigate('/wallet')
        window.location.reload()
        alert('구독목록이 삭제되었습니다.')

      }).catch((err)=>{
        alert('삭제하는데 실패했습니다.')

      })
    }
  
  
  return (
    <div id="Cancellation_Modal">
      <div className="Cancellation_Modal_section">
        <div className="Cancellation_Modal_section_sub">
          <span className="Cancellation_Modal_section_sub_title">
            구독을 삭제할까요?
          </span>
        </div>
        <span>
          구독을 삭제한다면 다시 표시할 수 없으며, 더이상 섭개더에서
          확인해드리지 않습니다.
        </span>
        <div className="Cancellation_Modal_bt_section">
       
          <button onClick={()=>closeCancellationModal()} className="Cancellation_Modal_bt_cancel">취소하기</button>
          <button onClick={handleDelete} className="Cancellation_Modal_bt_delete">삭제하기</button>
        </div>
      </div>
    </div>
  );
};

export default CancellationModal;
