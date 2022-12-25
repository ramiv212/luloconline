import { React } from 'react'
import { Image } from 'react-bootstrap'
import { Container,Row,Col } from 'react-bootstrap'
import ca from '../images/ca.webp'
import us from '../images/us.webp'
import col from '../images/col.webp'


function Policies() {
  return (
    <Container style={{paddingTop:'40px',paddingBottom:'120px'}}>
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
                        <h1 style={{textAlign:'center',paddingTop:'40px'}}>LULOC POLICIES</h1>
                        Please read our policies: All sales are final. No returns or refunds are accepted. 
                        For updated tracking information on your order, you can download the USPS app for status and delivery update. 
                        LULOC LLC is not responsible for theft or retained packages, once shipped to the corresponding address. 
                        We work every day, to satisfy our customers 100% Thank you very much for supporting our business.
                        </Col>
                    </Row>

                </Container>

            </Col>
        </Row>
    </Container>
  )
}

export default Policies