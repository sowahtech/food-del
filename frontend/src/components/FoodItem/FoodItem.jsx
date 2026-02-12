import { useContext } from "react";
import "./FoodItem.css";
import rating_stars from "../../assets/rating_stars.jpg";
import add_icon_white from "../../assets/add_icon_white.png";
import add_icon_green from "../../assets/add_icon_green.png";
import remove_icon_red from "../../assets/remove_icon_red.png";
import { StoreContext } from "./../../context/StoreContext";

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart, url } =
    useContext(StoreContext);

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img
          className="food-item-image"
          src={url + "/images/" + image}
          alt=""
          height="200vh"
        />
        {!cartItems[id] ? (
          <img
            className="add"
            onClick={() => addToCart(id)}
            src={add_icon_white}
          />
        ) : (
          <div className="food-item-counter">
            <img onClick={() => removeFromCart(id)} src={remove_icon_red} />
            <p>{cartItems[id]}</p>
            <img onClick={() => addToCart(id)} src={add_icon_green} />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={rating_stars} width="60vw" height="15vh" />
        </div>
        <p className="food-item-description">{description}</p>
        <p className="food-item-price">${price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
