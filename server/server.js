import express from "express";
import Stripe from 'stripe';
import * as prismic from '@prismicio/client'
import * as prismicH from '@prismicio/helpers'
import fetch from 'node-fetch'
import * as dotenv from 'dotenv';
import cors from 'cors';

const stripe = new Stripe('sk_test_51MHH3RHHalFjzBOnkKCpGKAGagFZI1HOVHhgZphYtdmpjm4qNYy29G9V9wQZge5AKAtCXqnwcPCzmd0UsQrG6g4S00ZW3RnMNx');

// start dotenv to use environment variables
dotenv.config();


// Express Stuff
const app = express();
app.use(express.json());
app.use(cors())

const corsOptions = {
    origin: process.env.REACT_APP_FRONTEND_URL,
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    methods: ['GET', 'PUT', 'POST']
  }


// Prismic Stuff
const repoName = 'luloconline'
const endpoint = prismic.getEndpoint(repoName)
const client = prismic.createClient(endpoint, { fetch })

const productsObjectForStripe = {}


// Prismic API Query & serialize for Stripe
const init = async () => {
    const prismicDoc = await client.getAllByType('product')

    // Prismic API call to get product IDs and prices
    prismicDoc.forEach(product => {
        productsObjectForStripe[product.id] = product.data['sale-price'] ? product.data['sale-price'] * 100 : product.data['original-price'] * 100
    })

    // Stripe Stuff

    function getOrderAmounts(items,productsObjectForStripe) {

        const listOfAmounts = []
        
        // create an array of the totals from each line item
        items.forEach(item => {
            listOfAmounts.push(
                productsObjectForStripe[item.id] * item.qty
            )
        })

        // add up all of the values in the array
        return listOfAmounts.reduce((a,b) => a + b, 0)
    }
    
    const calculateOrderAmount = (items) => {
        console.log(items)
        console.log(getOrderAmounts(items,productsObjectForStripe))
        return getOrderAmounts(items,productsObjectForStripe)
      };


    app.post("/create-payment-intent", cors(corsOptions), async (req, res) => {
        console.log('POST')
        const items = req.body
    
        // Create a PaymentIntent with the order amount and currency
        const paymentIntent = await stripe.paymentIntents.create({
            amount: calculateOrderAmount(items),
            currency: "usd",
            automatic_payment_methods: {
            enabled: true,
            },
        });
    
        res.send({
            clientSecret: paymentIntent.client_secret,
        });
    });
      
  }


init()


app.listen(process.env.REACT_APP_SERVER_PORT, () => console.log(`Node server listening on port ${process.env.REACT_APP_SERVER_PORT}!`));

