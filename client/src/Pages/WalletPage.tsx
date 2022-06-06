import WalletPageBottom from 'Components/walletcomponent/walletPageBottom'
import WalletPageCenter from 'Components/walletcomponent/walletPageCenter'
import WalletPageTop from 'Components/walletcomponent/walletPageTop'
import React from 'react'

import { BrowserRouter,Route ,Routes} from 'react-router-dom'


import '../css/pages/WalletPage.css'
const WalletPage =() =>{
   
    return(

        <div id = 'WalletPage'>

         
            <div className ='WalletPage_background'>

   <WalletPageTop></WalletPageTop>

            <WalletPageCenter></WalletPageCenter>

            <WalletPageBottom></WalletPageBottom>
            </div>

       
        </div>
      
       

    )
}

export default WalletPage;
