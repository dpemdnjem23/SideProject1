import SubRegistInfo from 'Components/mypageComponent/mypagesub/subregistInfo'
import SubRegistPeriod from 'Components/mypageComponent/mypagesub/subregistPeriod'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'

const RegisterPage = () =>{

    return(
<BrowserRouter>

        <div id ='RegisterPage'>
            <SubRegistInfo></SubRegistInfo>


            <SubRegistPeriod />
 


        </div>

        </BrowserRouter>
    )


}

export default RegisterPage