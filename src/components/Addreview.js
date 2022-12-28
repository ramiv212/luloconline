import { React, useState } from 'react'
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import useLocalStorage from "../useLocalStorage";

function Addreview({ productID }) {

  const [titleState,setTitleState] = useState('')
  const [nameState, setNameState] = useState('')
  const [ratingState, setRatingState] = useState(0)
  const [reviewState, setReviewState] = useState('')

  const [reviewWasSent,setReviewWasSent] = useLocalStorage(productID,false)

  function sendReviewRequest(body) {
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
      console.error(error)
    })
  }


  return (
    <div>{!reviewWasSent ?
      <Form action={`${process.env.REACT_APP_SERVER_URL}/api/reviews`} method={'post'}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" onChange={(e) => {setTitleState(e.target.value) ; console.log(titleState)} }>
        <Form.Label>Title</Form.Label>
        <Form.Control type="text"/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" onChange={(e) => {setNameState(e.target.value) ; console.log(nameState)} }>
        <Form.Label>Name</Form.Label>
        <Form.Control type="text"/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" onChange={(e) => {setRatingState(e.target.value) ; console.log(ratingState)} }>
        <Form.Label>Rating</Form.Label>
        <Form.Control type="number"/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1" onChange={(e) => {setReviewState(e.target.value) ; console.log(reviewState)} }>
        <Form.Label>Review</Form.Label>
        <Form.Control as="textarea" rows={3} />
      </Form.Group>
      <Button variant="primary" onClick={() => {
        sendReviewRequest({
          date: Date.now(),
          productID: productID,
          title: titleState,
          name: nameState,
          rating: ratingState,
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
      : <div style={{textAlign:'center',margin:'auto',width:'100%'}}>"Thank you for your review!"</div>}
    </div>
  )
}

export default Addreview