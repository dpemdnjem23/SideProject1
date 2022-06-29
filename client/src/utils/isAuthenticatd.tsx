



export const isAuthenticated = () =>{

const accessToken = localStorage.getItem('accessToken')
//httpOnly로 js로 는 쿠키에 접근할수가 없다.

const base64Payload= accessToken?.split(' ')[1]; 
//value 0 -> header, 1 -> payload, 2 -> VERIFY SIGNATURE
const payload = Buffer.from(base64Payload! ,'base64') 
const result = JSON.parse(payload.toString())
console.log(result);

const refreshToken  = document.cookie.split(';')
console.log(accessToken,'access',refreshToken,'refresh')


}