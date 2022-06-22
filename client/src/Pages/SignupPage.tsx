import Signup from 'Components/Signup/Signup'
import SignupBackLogin from 'Components/Signup/SignupBackLogin'
import SignupBtn from 'Components/Signup/SignupBtn'
import React from 'react'

import '../css/pages/SignupPage.css'
const SignupPage = () =>{


    return(
        <div id= 'SignupPage'>
            <Signup></Signup>
            <SignupBtn></SignupBtn>
            <SignupBackLogin></SignupBackLogin>

        </div>
    )
}
export default SignupPage