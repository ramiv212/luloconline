import React from 'react'
import { Container,Row,Col,Image } from 'react-bootstrap'
import healthyLiving from '../images/vida saludable_edited.webp'
import tumeric from '../images/turmeric-powder-and-turmeric-root.webp'
import cbd from '../images/cannabis-oil.webp'

function Learn() {
  return (
    <Container flex className='learn-page-container'>

        <Row className='learn-page-row'>
            <Col className='learn-page-col order-last order-md-first' md={6}>
                <h1> The benefits of healthy living</h1>
                
                <h4 style={{marginBottom:'30px'}}>Why is a healthy lifestyle important?</h4>

                Living a healthier lifestyle means a lower risk of developing many illnesses and fewer health problems. 
                Taking control of your life and getting healthy helps you feel in control of your life, you will feel better from the inside out.
            </Col>

            <Col className='learn-page-col' md={6}>
                <Image src={healthyLiving} fluid></Image>
            </Col>
        </Row>

        <Row className='learn-page-row'>
            <Col className='learn-page-col' md={6}>
                <Image src={tumeric} fluid></Image>
            </Col>
            <Col className='learn-page-col' md={6}>
                <h1> The benefits of tumeric</h1>

                <p>Turmeric — and especially its most active compound, curcumin — have many scientifically proven health benefits, such as the potential to improve heart health and prevent against Alzheimer's and cancer. It's a potent anti-inflammatory and antioxidant. It may also help improve symptoms of depression and arthritis.
                    In fact, turmeric has skin-lightening properties which help you get rid of dark spots effectively without causing any side-effects.
                    Still struggling with acne? Not only will the anti-inflammatory properties of turmeric help, but so will its antibacterial properties.
                    Turmeric benefits the skin in more ways than one. This age-old ingredient is loaded with antioxidants and anti-inflammatory components which help treat a number of skin concerns such as acne and acne scars, pigmentation, early signs of ageing and sun damage, to name a few.
                    This easily-available yellow spice gets its skin-enhancing properties mainly from curcumin, an active component that provides glow and luster to the skin. From acne to stretch marks and psoriasis, turmeric is a miracle ingredient for your skin.
                    Here are all the benefits of using turmeric in your skincare routine.</p>

            </Col>
        </Row>

        <Row className='learn-page-row'>
            <Col className='learn-page-col order-last order-md-first' md={6}>
                <h1> The benefits of CBD</h1>
                
                The cannabis plant comes in two main varieties: Cannabis Sativa and Cannabis Indica. Either subspecies contains over 100 chemical compounds (called cannabinoids), including CBD (cannabidiol) and THC (tetrahydrocannabinol).
                Marijuana derives from either variety of cannabis, but hemp only comes from the Cannabis Sativa plant. Hemp plants contain very little THC, the compound responsible for the psychoactive effects of cannabis. Instead, they contain a much higher concentration of CBD, the non-psychoactive compound in cannabis. The majority of CBD products are sourced from hemp.
                CBD provides various health effects, from anxiety and pain relief to better skin and heart health. However, because CBD is separate from THC, the psychoactive compound of cannabis, CBD users can enjoy the health benefits of CBD without experiencing the “high” associated with marijuana. This enables users to safely use CBD without worrying about being high disrupting their daily lives
            </Col>

            <Col className='learn-page-col' md={6}>
                <Image src={cbd} fluid></Image>
            </Col>
        </Row>

    </Container>
  )
}

export default Learn