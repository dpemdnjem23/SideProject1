import React from 'react' 

import '../../css/common/modal/subDetailModal.css'


type modal = {

    closeSubModal:() =>void
  }
const SubDetailModal:React.FC<modal> = ({closeSubModal}) =>{
    console.log('모달시작')

    return(
        <div onClick = {() =>closeSubModal()} id='SubDetail_Modal'>
            <div  className='SubDetail_Modal_section'>

                <img src='./images/netflex.png' />
                <span>넷플릭스</span>

                <div>
                    
                </div>
                
            </div>
        </div>
    )
}

export default SubDetailModal