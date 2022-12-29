import express from "express";
import Stripe from 'stripe';
import * as prismic from '@prismicio/client'
import * as prismicH from '@prismicio/helpers'
import fetch from 'node-fetch'
import * as dotenv from 'dotenv';
import cors from 'cors';
import nodemailer from 'nodemailer';
import * as fs from 'fs';
import e from "express";

import { createRequire } from 'module';
const require = createRequire(import.meta.url);

import * as url from 'url';
    const __filename = url.fileURLToPath(import.meta.url);
    const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const path = require('path');

// start dotenv to use environment variables
dotenv.config();

const stripe = new Stripe(process.env.REACT_APP_STRIPE_KEY);

// nodemailer Stuff
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'ramiv212@gmail.com',
      pass: process.env.REACT_APP_GMAIL_PASS
    }
  });


  function sendContactEmail(name,email,cell,message,res) {
    const mailOptions = {
        from: email,
        to: 'ramiv212@hotmail.com',
        subject: `You got a message via luloconline.com from ${name}!`,
        text: `
        email: ${email}
        name: ${name}
        cell: ${cell}
        message ${message}`
    };
    
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
        console.log(error);
        res.status(500).json({error: e.message})

        } else {
        console.log('Email sent: ' + info.response);
        res.status(200).send('success!')
        }
    });
  }


// Express Stuff
const app = express();
app.use(express.json());
app.use(cors())
// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../build')));


const corsOptions = {
    origin: [process.env.REACT_APP_FRONTEND_URL],
    credentials:true,
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    methods: ['GET', 'PUT', 'POST']
  }


// Prismic Stuff
const repoName = 'luloconline'
const endpoint = prismic.getEndpoint(repoName)
const client = prismic.createClient(endpoint, { fetch })

const productsObjectForStripe = new Map()


// Prismic API Query & serialize for Stripe
const init = async () => {
    const prismicDoc = await client.getAllByType('product')

    // Prismic API call to get product IDs and prices
    prismicDoc.forEach(product => {
        productsObjectForStripe[product.id] = {
            name: product.data.name[0].text,
            price: product.data['sale-price'] ? product.data['sale-price'] * 100 : product.data['original-price'] * 100,

        }
    })
}
    // Stripe Stuff
    function getOrderSum(items,productsObjectForStripe) {

        const listOfAmounts = []
        
        // create an array of the totals from each line item
        items.forEach(item => {
            listOfAmounts.push(
                productsObjectForStripe[item.id].price * item.qty
            )
        })
        // add up all of the values in the array
        return listOfAmounts.reduce((a,b) => a + b, 0)
    }


    function returnShippingOptions(items,productsObjectForStripe) {
        if (getOrderSum(items,productsObjectForStripe) > 15000) {
            return [
                {shipping_rate: 'shr_1MIHoKHHalFjzBOnWUjpBFg8'}
            ]
        } else {
            return [
                {shipping_rate: 'shr_1MIEuLHHalFjzBOnsjZYx7SO'},
                {shipping_rate: 'shr_1MIEvvHHalFjzBOnlScoRDrR'},
                {shipping_rate: 'shr_1MIEwLHHalFjzBOnY9utK0D5'},
                {shipping_rate: 'shr_1MIEx9HHalFjzBOnC71hOgmN'},
            ]
        }
    }

    app.post("/create-checkout-session", cors(corsOptions), async (req, res) => {
        console.log('POST')
        const items = req.body.items



        const lineItemsObject = await items.map(item => {

            return {
                price_data: {
                    currency: 'usd',
                    tax_behavior: "exclusive",
                    product_data: {
                        name: productsObjectForStripe[item.id].name,
                    },
                    unit_amount: Math.trunc(productsObjectForStripe[item.id].price,)
                },
                quantity: item.qty,

            }
        })

        // console.log(lineItemsObject)
    
        try {
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                mode: 'payment',
                shipping_address_collection: {allowed_countries: ['US', 'CA']},
                shipping_options: returnShippingOptions(items,productsObjectForStripe),
                line_items: lineItemsObject,
                automatic_tax: {
                    enabled: true,
                  },
                success_url: `${process.env.REACT_APP_FRONTEND_URL}/success`,
                cancel_url: `${process.env.REACT_APP_FRONTEND_URL}/products`,
            })

            console.log(returnShippingOptions(items,productsObjectForStripe))
            res.json({url: session.url });
        } catch ( e ) {
            console.log(e.message)
            res.status(500).json({error: e.message})
        }    
    });


    app.post("/send-contact-form", cors(corsOptions), async (req, res) => {
        console.log(req.body)
        
        const email = req.body.email
        const name = req.body.name
        const cell = req.body.phone
        const message = req.body.message

        sendContactEmail(name,email,cell,message,res)

    });
      

    function writeToReviewFile(object) {
        const jsonString = JSON.stringify(object)
        fs.writeFile('./reviews.json',jsonString,err => {
            if (err) {
                console.log(err)
            } else {
                console.log('Successfuly updated reviews')
            }
        })
    }

    app.post("/api/reviews/", cors(corsOptions), (req,res) => {

        const reviewsFile = fs.readFileSync('./reviews.json');
        const reviewsFileArray = JSON.parse(reviewsFile)

        const newReviewObject = req.body

        console.log(newReviewObject)
        
            if(reviewsFileArray.find(element => newReviewObject.productID === Object.keys(element)[0])) {
                // if object has been reviewed, add the review to the array inside of the object that already exists inside of the file
                let objectToUpdate = reviewsFileArray.find(element => newReviewObject.productID === Object.keys(element)[0])[newReviewObject.productID]
                const reviewObjectToAdd = {
                    date: newReviewObject.date,
                    title: newReviewObject.title,
                    name: newReviewObject.name,
                    rating: newReviewObject.rating,
                    review: newReviewObject.review,
                }
                objectToUpdate.push(reviewObjectToAdd)
                console.log(reviewsFileArray)
                writeToReviewFile(reviewsFileArray)

            } else {
                // if product has not been reviewed yet, add review to the json file inside of an array.
                const reviewObjectToAdd = {}
                reviewObjectToAdd[newReviewObject.productID] = [{
                    date: newReviewObject.date,
                    title: newReviewObject.title,
                    name: newReviewObject.name,
                    rating: newReviewObject.rating,
                    review: newReviewObject.review,
                }]
                const newReviewsFileArray = [...reviewsFileArray,reviewObjectToAdd]
                writeToReviewFile(newReviewsFileArray)
            }
    })

    app.get("/api/reviews/:id", cors(corsOptions), (req,res) => {
        const productToGet = req.params.id
        // console.log(productToGet)

        const reviewsFile = fs.readFileSync('./reviews.json');
        const reviewsFileArray = JSON.parse(reviewsFile)

        const itemToSend =  reviewsFileArray.find(element => productToGet === Object.keys(element)[0])
            if (!itemToSend) { res.status(400) }
            else {
            res.json(
                itemToSend
            )
        }
    })

    app.get("/", (req, res) => {
        res.sendFile(path.join(__dirname, "public", "index.html"));
       });

init()

app.listen(process.env.REACT_APP_SERVER_PORT, () => console.log(`Node server listening on port ${process.env.REACT_APP_SERVER_PORT}!`));

