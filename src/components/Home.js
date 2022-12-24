import {
  usePrismicDocumentByUID,
  usePrismicDocumentsByType,
} from "@prismicio/react";
import * as prismic from "@prismicio/client";
import Product from "./Product";
import { Container,Row,Col } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookOpen,faBagShopping,faHeart } from '@fortawesome/free-solid-svg-icons'

function Home() {
  const [document] = usePrismicDocumentByUID("homepage", "homepage");

  const [favorites] = usePrismicDocumentsByType("product", {
    predicates: [prismic.predicate.at("my.product.isfavorite", true)],
  });

  let firstFourFavorites = null;
  if (favorites) {
    firstFourFavorites = Object.values(favorites.results).slice(0, 4);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <div
        style={{
          backgroundImage: `url("${
            document && document.data.homepagebanner.url
          }")`,
          height: "calc(100vh - 250px)",
          backgroundSize: "cover",
          backgroundPosition: "100% 50%",
          width: "100%",
          display: "flex",
          alt:'Homepage Banner'
        }}
      >
        <div
          style={{
            backgroundImage:
              "linear-gradient(to right, rgb(153,164,130), rgb(153,164,130,0))",
            width: "100%",
            height: "100%",
            position: "relative",
          }}
        >
          <div id="homepage-banner-text">
            
            <div style={{ width: "50%" }}>
              <h1>Professional Skin Care Products +</h1>
              Good health is not just the absence of disease or illness, it is a
              state of complete physical, mental and social well-being.
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "calc(100vh)",
        }}
      >
        <h3 style={{ fontSize: "20px", padding: "30px" }}>Shop By Category</h3>
        
          <Container fluid style={{width:'90%'}}>
            <Row>
              <Col md={3} xs={6} style={{textAlign:'center'}}>
                <div>
                  {document && document.data.firstsquaretext[0].text}
                </div>
                
                {/* image */}
                <div className="home-category-images" style={{
                  backgroundImage: `url(${document && document.data.firstsquareimage.url})`,
                  backgroundSize: 'cover',
                }} ></div>

              </Col>

              <Col md={3} xs={6} style={{textAlign:'center'}}>
                <div>
                  {document && document.data.secondsquaretext[0].text}
                </div>

                {/* image */}
                <div className="home-category-images" style={{
                  backgroundImage: `url(${document && document.data.secondsquareimage.url})`,
                  backgroundSize: 'cover',
                }} >

                </div>
              </Col>

              <Col md={3} xs={6} style={{textAlign:'center'}}>
                <div>
                  {document && document.data.thirdsquaretext[0].text}
                </div>

                {/* image */}
                <div className="home-category-images" style={{
                  backgroundImage: `url(${document && document.data.thirdsquareimage.url})`,
                  backgroundSize: 'cover',
                }} ></div>
                
              </Col>

              <Col md={3} xs={6} style={{textAlign:'center'}}>
                <div>
                  {document && document.data.fourthsquaretext[0].text}
                </div>
                
                {/* image */}
                <div className="home-category-images" style={{
                  backgroundImage: `url(${document && document.data.fourthsquareimage.url})`,
                  backgroundSize: 'cover',
                }} ></div>

              </Col>
            </Row>
          </Container>
    

        <div
          className="bg-light"
          style={{ margin: "70px", width: "100%", height: "20%" }}
        >
          <Container style={{height:'100%'}}>
            <Row style={{height:'100%'}}>
              <Col className="homepage-info-squares">
                <FontAwesomeIcon icon={faBagShopping} style={{width:'40px', height:'40px'}} />
                <div>Shop</div>
              </Col>

              <Col className="homepage-info-squares">
                <FontAwesomeIcon icon={faBookOpen} style={{width:'40px', height:'40px'}} />
                <div>Learn</div>
              </Col>

              <Col className="homepage-info-squares">
                <FontAwesomeIcon icon={faHeart} style={{width:'40px', height:'40px'}} />
                <div>Our Vision</div>
              </Col>

              <Col className="homepage-info-squares">
                <FontAwesomeIcon icon={faBookOpen} style={{width:'40px', height:'40px'}} />
                <div>Contact Us</div>
              </Col>

            </Row>
          </Container>
        </div>
      </div>

      <div style={{ height: "100vh" }}>
        <h3
          style={{
            fontSize: "20px",
            padding: "30px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Favorite Products
        </h3>

        <Container fluid>
            <Row>
                {firstFourFavorites &&
                  firstFourFavorites.map((favoriteProduct) => {
                    return (
                      <Col xs={12} sm={6} md={3}
                        key={favoriteProduct.id}
                      >
                        <Product
                          data={favoriteProduct.data}
                          id={favoriteProduct.id}
                          width={235}
                        />
                      </Col>
                    );
                  })}
            </Row>
          </Container>
      </div>
    </div>
  );
}

export default Home;
