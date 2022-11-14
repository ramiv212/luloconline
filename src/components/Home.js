import React from 'react'
import { usePrismicDocumentByUID } from '@prismicio/react';



function Home() {

const [document] = usePrismicDocumentByUID('homepage', 'homepage')

    console.log(document && document.data)

  return (
  <div style={{display: 'flex', flexDirection: 'column', width: '100%'}}>

    <div style={{backgroundImage:`url("${document && document.data.homepagebanner.url}")`,
                 height: 'calc(100vh - 250px)',
                 backgroundSize: 'cover',
                 backgroundPosition: '100% 50%',
                 width: '100%',
                 display: 'flex'}}>

        <div style={{backgroundImage: "linear-gradient(to right, rgb(153,164,130), rgb(153,164,130,0))" ,
                      width: '100%',
                      height: '100%',
                      position: 'relative'}}>
          
          <div style={{width: '50%', 
                      height: '100%', 
                      display: 'flex',
                      alignItems: 'center', 
                      justifyContent: 'center',
                      flexDirection: 'column',
                      fontSize: '150%'}}>

            <div style={{width: '50%'}}>
              <h1>Professional Skin Care Products +</h1>
              Good health is not just the absence of disease or illness, it is a state of complete physical, mental and social well-being.
            </div>
          
          </div>
        </div>
    </div>

    <div style={{display: 'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',paddingTop:'70px', paddingBottom:'20px'}}>
      <h3>Shop By Category</h3>
    </div>

    <div style={{width:'100%', display:'flex',alignItems:'center',justifyContent:'center'}}>
      <div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center',width: '80%'}}>

        <div className='homepage-square' style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
          <div>Card 1</div>
        </div>

        <div className='homepage-square' style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>

          Card 2
        </div>

        <div className='homepage-square' style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>

          Card 3
        </div>

        <div className='homepage-square' style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>

          Card 4
        </div>
      </div>
    </div>

  </div> 
  )
}

export default Home