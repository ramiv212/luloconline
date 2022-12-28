import { React, useState } from 'react'
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import useLocalStorage from "../useLocalStorage";

function Addreview({ productID }) {

  const [titleState,setTitleState] = useState('')
  const [nameState, setNameState] = useState('')
  const [ratingState, setRatingState] = useState(5)
  const [reviewState, setReviewState] = useState('')

  const [reviewWasSent,setReviewWasSent] = useLocalStorage(productID,false)

  function sendReviewRequest(body) {

    try {
      fetch(`${process.env.REACT_APP_SERVER_URL}/api/reviews/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })
      .then((response) => response.json())
      .then((data)=> {
        console.log(data)
      })
      .catch((error) => {
        // console.error(error)
      })
    } catch (error) {
      console.log(error)
    }


  }


  return (
    <div>{!reviewWasSent ?
      <Form 
      action={`${process.env.REACT_APP_SERVER_URL}/api/reviews`} method={'post'}
      style={{display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}}
      
      >
      <Form.Group className="mb-3 w-100" controlId="exampleForm.ControlInput1" onChange={(e) => {setTitleState(e.target.value)} }>
        <Form.Label>Title <span className='required-text'>*Required</span></Form.Label>
        <Form.Control type="text"/>
      </Form.Group>
      <Form.Group className="mb-3 w-100" controlId="exampleForm.ControlInput1" onChange={(e) => {setNameState(e.target.value)} }>
        <Form.Label>Name <span className='required-text'>*Required</span></Form.Label>
        <Form.Control type="text"/>
      </Form.Group>

      <Form.Select 
        aria-label="Default select example" 
        onChange={(e) => {
          console.log(e.target.value)
          setRatingState(e.target.value)
        }}>
        <option disabled={true}>Select a rating</option>
        <option value={5}>5</option>
        <option value={4}>4</option>
        <option value={3}>3</option>
        <option value={2}>2</option>
        <option value={1}>1</option>
      </Form.Select>

      <Form.Group className="mb-3 w-100" controlId="exampleForm.ControlTextarea1" onChange={(e) => {setReviewState(e.target.value)} }>
        <Form.Label>Review <span className='required-text'>*Required</span></Form.Label>
        <Form.Control as="textarea" rows={3} />
      </Form.Group>
      <Button
      disabled={
        titleState === "" ||
        nameState === "" ||
        ratingState === "Select a rating" || 
        reviewState === ""
      }
      className='product-card-button w-100'
      variant="primary" onClick={() => {
        console.log(ratingState);
        sendReviewRequest({
          date: Date.now(),
          productID: productID,
          title: titleState,
          name: nameState,
          rating: parseInt(ratingState),
          review: reviewState,
        })
        const localStorageObject = {}
        localStorageObject[productID] = true
        console.log(localStorageObject)
        setReviewWasSent(true)
      }} >
        Submit
      </Button>
    </Form>
      : <div style={{textAlign:'center',margin:'auto',width:'100%'}}>Thank you for your review!</div>}
    </div>
  )
}

export default Addreview