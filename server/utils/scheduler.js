const schedule  =require('node-schedule')

//매일 0시에 실핼되도록
const rule = `* * 0 * * *`

 const schuduleDateControll = schedule.scheduleJob(rule , async (req,res) =>{

    
        try{
          const today = moment().format('YYYY-MM-DD')
          
          
          const personalWallet = await wallet.findAll({where:{end_date:{[Op.lte]:today}}})
          
          console.log(personalWallet)
          //start_date가 ===today 랑 같은 걸 find 한다.
          //start_date === today 
          //지갑에 있는 모든 구독을 불러온다.
          // 
    
    
          //today가 end_date에 도달하는 순간, 목록들을 불러온다. 
          //불러온 목록들중 , cycle이 다 다르다. 이 다른 cycle들을 end_date
          //반복문으로 업데이트? sequelize 이용하여 업데이트?
          
    
    if(personalWallet.length===0){
      return res.status(400).send('날짜를 찾을수없다.')
    }
    
            personalWallet.forEach(async (v)=>{
    
              // const startdate = v.dataValues.start_date
              const enddate =  v.dataValues.end_date
    
              const calculateEnd_date = moment(enddate).add(Number(v.dataValues.cycleDay)+Number(v.dataValues.cycleMonth)*30,Number(v.dataValues.cycleYear)*365
              ,'d').format('YYYY-MM-DD')
    
    
    
           const updateWallet =    await wallet.update({start_date:enddate,end_date:calculateEnd_date},{where:{name:v.dataValues.name}})
    
    
           console.log(updateWallet)
    
           if(!updateWallet){
             return res.status(400).send('업데이트 실패')
           }
            })
    
            return res.status(200).send('날짜가 갱신되었습니다.')
    
    
        }catch(err){
          return res.status(500).send(err)
        }
    
      }

)


module.exports = schuduleDateControll