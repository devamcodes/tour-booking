import React from "react";
import CardItems from "./CardItems";
import "./Cards.css";

function Cards() {
  return (
    <div className="cards">
      <h1>Check out these EPIC Destinations!</h1>
      <div className="cards__container">
        <div className="cards__wrapper">
          <ul className="cards__items">
            <CardItems
              src="./img/img-9.jpg"
              text="Explore The Waterfall Iinside The Amazon Jungle"
              label="Adventure"
              path="/services"
              alt="Travel"
            />
            <CardItems
              src="./img/img10.jpeg"
              text="Explore The  Iinside The Amazon Jungle"
              label="Adventure"
              path="/services"
              alt="Camping"
            />
          </ul>
          <ul className="cards__items">
            <CardItems
              src="./img/img11.jpeg"
              text="Explore The  The Amazon Jungle"
              label="Adventure"
              path="/products"
              alt="Mountaining"
            />
            <CardItems
              src="./img/img12.jpeg"
              text="Explore The  Amazon Jungle"
              label="Adventure"
              path="/sign-in"
              alt="River"
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
