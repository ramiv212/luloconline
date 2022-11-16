import { usePrismicDocumentByUID,usePrismicDocumentsByType } from '@prismicio/react';
import * as prismic from '@prismicio/client'
import Product from './Product'

function Home() {

const [document] = usePrismicDocumentByUID('homepage', 'homepage')

const [favorites, { state, error }] = usePrismicDocumentsByType('product',{
  predicates: [
      prismic.predicate.at('my.product.isfavorite', true)
  ]
});

  let firstFourFavorites = null
  if (favorites) {firstFourFavorites = Object.values(favorites.results).slice(0,4)}


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

    <div style={{display: 'flex',
                flexDirection:'column',
                alignItems:'center',
                justifyContent:'center',
                height: 'calc(100vh)',}}>

      <h3 style={{fontSize:'20px',padding:'30px'}}>Shop By Category</h3>

        <div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center',width: '90%'}}>
        
          <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',width:'33%'}}>
            <div style={{paddingBottom:'10px'}}>{document && document.data.firstsquaretext[0].text}</div>
            <img src={document && document.data.firstsquareimage.url} style={{width:'95%', aspectRatio:'1 / 1',objectFit:'cover'}} />
          </div>

          <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',width:'33%'}}>
            <div style={{paddingBottom:'10px'}}>{document && document.data.secondsquaretext[0].text}</div>
            <img src={document && document.data.secondsquareimage.url} style={{width:'95%', aspectRatio:'1 / 1',objectFit:'cover'}} />
          </div>

          <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',width:'33%'}}>
            <div style={{paddingBottom:'10px'}}>{document && document.data.thirdsquaretext[0].text}</div>
            <img src={document && document.data.thirdsquareimage.url} style={{width:'95%', aspectRatio:'1 / 1',objectFit:'cover'}} />
          </div>

          <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',width:'33%'}}>
            <div style={{paddingBottom:'10px'}}>{document && document.data.fourthsquaretext[0].text}</div>
            <img src={document && document.data.fourthsquareimage.url} style={{width:'95%', aspectRatio:'1 / 1', objectFit:'cover'}} />
          </div>

        </div>

        <div className='bg-light' style={{margin:'70px',width:'89%'}}>
          <div className='bg-light' style={{width:'100%',display:'flex',flexDirection:'rows',alignItems:'center',justifyContent:'center'}}>
            <div className='homepage-info-squares'>
              Box 1
            </div>
            <div className='homepage-info-squares'>
              Box 1
            </div>
            <div className='homepage-info-squares'>
              Box 1
            </div>
            <div className='homepage-info-squares'>
              Box 1
            </div>
          </div>
        </div>

      </div>

      <div style={{height:'100vh'}}>
        <h3 style={{fontSize:'20px',padding:'30px',display:'flex',justifyContent:'center'}}>Favorite Products</h3>
        <div style={{margin:'70px',width:'89%'}}>
            <div style={{width:'100%',display:'flex',flexDirection:'rows',alignItems:'center',justifyContent:'center'}}>
              
              {firstFourFavorites &&
                firstFourFavorites.map((favoriteProduct) => {
                  return <div className='homepage-info-squares' key={favoriteProduct.id}>
                    <Product data={favoriteProduct.data} id={favoriteProduct.id} />
                  </div>
                })
              }
            
            </div>
          </div>
        </div>
  </div> 
  )
}

export default Home