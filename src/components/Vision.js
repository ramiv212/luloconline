import { React } from 'react'
import { Image } from 'react-bootstrap'
import { Container,Row,Col } from 'react-bootstrap'
import ca from '../images/ca.webp'
import us from '../images/us.webp'
import col from '../images/col.webp'


function Vision() {
  return (
    <Container style={{paddingTop:'40px',paddingBottom:'40px'}}>
        <Row style={{height:'100%'}}>
            <Col style={{display:'flex',justifyContent:'center',alignItems:'flex-start',height:'100%'}}>
            
                <Container>
                    <Row>
                        <Col>
                            <Image src={ca} className={'h-100'} fluid></Image>
                        </Col>
                        <Col>
                            <Image src={us} className={'h-100'} fluid></Image>
                        </Col>
                        <Col>
                            <Image src={col} className={'h-100'} fluid></Image>
                        </Col>
                    </Row>

                    <Row>
                        <Col>   
                        <h1 style={{textAlign:'center',paddingTop:'40px'}}>MISSION</h1>
                        Our mission is to help wellness and inclusive beauty. To be affordable for all people, generating life expectancy with innovative products. 
                        With proven benefits of powerful natural ingredients, of high quality so that our collaborators, who are our clients and our reason for being, can see themselves and feel aesthetically empowered by their beauty. 
                        Our VISION is to Turn our LULOC brand into a benchmark in the sector of skin care products at a national and international level. While using natural and innovative ingredients, helping to improve the quality of life of our consumers.
                        </Col>
                    </Row>

                    <Row>
                        <Col>   
                        <h1 style={{textAlign:'center',paddingTop:'40px'}}>OBJECTIVES</h1>
                        Luluc, aims to expand in national and international markets and generate entrepreneurship opportunities for men and women who want to be associated with our brand. 
                        Position our brand thar specializes in expertise skin care products. With promoting continuos collaborations with clients and interested parties, to achieve maximum satisfaction. 
                        Philosophy: Our philosophy lies in the creation of natural products that provide well-being, authenticity, and satisfactory results to our clients. Who seek to feel and look radiant naturally. 
                        This will allow us to quickly position ourselves in the market segments of essential products with quality and innovation. 
                        </Col>
                    </Row>

                </Container>

            </Col>
        </Row>
    </Container>
  )
}

export default Vision