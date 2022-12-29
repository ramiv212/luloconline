import { React,useEffect,useState } from 'react'
import { Container,Row,Col } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

function Contact() {

const [success,setSuccess] = useState(false)
const [validated, setValidated] = useState(false);
const [emailState,setEmailState] = useState('')
const [nameState,setNameState] = useState('')
const [phoneState,setPhoneState] = useState(null)
const [messageState,setMessageState] = useState('')

useEffect(() => {
    setSuccess(false)
},[])

useEffect(() => {
    

    if(emailState !== "" && (emailState && emailState.includes('@') && emailState.includes('.'))  && nameState !== "" && phoneState !== "" && (phoneState && phoneState.length >= 11) && messageState !== "") {
        setValidated(true) 
    } else {
        setValidated(false)
    }
},[emailState,nameState,phoneState,messageState])

 function sendContactFormRequest() {

    fetch(`${process.env.REACT_APP_SERVER_URL}/send-contact-form`, {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json',
        },
        body: JSON.stringify({
            email: emailState,
            name: nameState,
            phone: phoneState,
            message: messageState,
        })
    }).then(res => {
        if (res.ok) {
            console.log(res)
            setSuccess(true)
            return res.json()
        }
        return res.json().then(json => Promise.reject(json))
    }).catch(e => {
        console.error(e.error)
    })
 }


  return (
    <Container>
        <Row style={{display:'flex', 
            justifyContent:'center',
            alignItems:'center', 
            padding:'40px', 
            fontFamily:"'Dosis', sans-serif",
            fontSize:'150%'}}>
        <Col lg={4}>

            <h1  style={{paddingBottom:'50px'}}>Contact Us</h1>

        { (!success) ? <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label> <span className='required-text'>&nbsp;*required</span>
                <Form.Control type="email"
                 placeholder="Enter email" 
                 value={emailState} onChange={(e) => {setEmailState(e.target.value)}}
                 required />
                 <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Text className="text-muted">
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Name</Form.Label> <span className='required-text'>&nbsp;*required</span>
                <Form.Control type="text" 
                            placeholder="Enter your full name" 
                            value={nameState} 
                            onChange={(e) => {setNameState(e.target.value)}}
                            required />
                <Form.Text className="text-muted">
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Cell</Form.Label> <span className='required-text'>&nbsp;*required</span>
                <PhoneInput
                    country={'us'}
                    value={phoneState} onChange={ phone => {setPhoneState( phone )}}
                    required
                    />
                <Form.Text className="text-muted">
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Message</Form.Label> <span className='required-text'>&nbsp;*required</span>
                <Form.Control as="textarea" rows={3} value={messageState} onChange={(e) => {setMessageState(e.target.value)}} />
            </Form.Group>
            <Form.Group style={{textAlign:'center'}}>

                <Button style={{backgroundColor:'rgb(153,164,130)',
                                borderColor:'rgb(153,164,130)',
                                width:'100px'}}
                                disabled={!validated}
                                onClick={sendContactFormRequest}
                                >Submit</Button>
            </Form.Group>
        </Form> : 
        
            <div style={{textAlign:'center', height:'60vh'}}>
                The message has been sent!
                We will be in contact with you shortly.
            </div>
        
        }

        </Col>
        </Row>
    </Container>
  )
}

export default Contact