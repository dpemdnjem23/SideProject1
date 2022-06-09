import React ,{useState}from 'react'
import Calendar from 'react-calendar';



import '../css/pages/CallendarPage.css'
const CallendarPage = () => {
  const [value, onChange] = useState<Date>(new Date());
  return(

    <div>
           <Calendar onChange={onChange}value={value}></Calendar>
    </div>
  )
};

export default CallendarPage;
