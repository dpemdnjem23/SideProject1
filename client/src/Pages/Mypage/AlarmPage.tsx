import AlarmMain from 'Components/Alarm/alarmMain'
import AlarmTop from 'Components/Alarm/alarmTop'
import React ,{useState}from 'react'

import '../../css/pages/AlarmPage.css'
const AlarmPage = ()=>{

    return(
        <div id='AlarmPage'>
            <AlarmTop></AlarmTop>
            <AlarmMain></AlarmMain>


        </div>


    )


}
export default AlarmPage