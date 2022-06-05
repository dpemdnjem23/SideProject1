import React from 'react'


import '../../../css/components/MyPage/MypageShare/shareregistBoard.css'
const ShareRegistBoard = () =>{



    return (

        <div>
            <div>

                <div>글 남기기</div>
            </div>

            <div>
            <textarea placeholder = '왜 공유 하고싶은지 간단하게 적어주세요!' name ='board'></textarea>

            </div>
            
        </div>
    )


}

export default ShareRegistBoard