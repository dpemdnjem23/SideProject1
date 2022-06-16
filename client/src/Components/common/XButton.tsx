import React from 'react'

import { useNavigate } from 'react-router'

import '../../css/common/XButton.css'


const XButton = () =>{

    const back = useNavigate()
    


    return(
        <div className="Xbt_section">
            <button onClick = {()=>back(-1)}>X</button>
        </div>
    )
}

export default XButton