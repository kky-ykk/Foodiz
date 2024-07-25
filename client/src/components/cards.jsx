import React, { useEffect, useRef, useState } from "react";
import { useCart, useDispatchCart } from "./contextReducer";


export default function Cards(probs) {

  

  const optObj = probs.options[0];
  const optionsKeys = Object.keys(optObj);

  const priceRef = useRef("");

  const foodItem = probs.foodItem;
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");

  const dispatch = useDispatchCart(); //dispatch methods of contextReducer can be used without object reference
  const data = useCart();

  async function handleAddToCart() {
    let food = []
    for (const item of data) {
      if (item.id === foodItem._id) {
        food = item;

        break;
      }
    }
    if (food.length!=0) {
      if (food.size === size) {
        await dispatch({ type: "UPDATE", id: foodItem._id, price: finalPrice, qty: qty })
        return
      }
      else if (food.size !== size) {
        await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size,img: foodItem.img })
        
        return
      }
      return
    }

    dispatch({
      type: "ADD",
      id: foodItem._id,
      name: foodItem.name,
      price: finalPrice,
      qty: qty,
      size: size,
      img: foodItem.img,
    });
  }

  let finalPrice = qty * parseInt(probs.options[0][size]);
  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  return (
    <div style={{}}>
      <div
        className="car mt-3 rounded"
        style={{
          width: "18rem",
          maxHeight: "360px",
          border: "1px solid white",
          maring: "20px !important",
        }}
      >
        <img
          src={probs.foodItem.img}
          className="card-img-top"
          alt="..."
          style={{ height: "130px", objectFit: "fill" }}
        />
        <div className="card-body">
          <h5 className="card-title">{probs.foodItem.name}</h5>
          <p className="card-text">{probs.desc}</p>

          <div className="container w-100">
            <select
              className="m-2 h-100 rounded"
              onChange={(e) => setQty(e.target.value)}
              style={{background:"#FFC96F "}}
            >
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>
                    {" "}
                    {i + 1}
                  </option>
                );
              })}
            </select>
            <select
              className="m-2 h-100  rounded"
              ref={priceRef}
              onChange={(e) => setSize(e.target.value)}
              style={{background:"#FFC96F "}}
            >
              {optionsKeys.map((data) => {
                return (
                  <option key={data} value={data}>
                    {data}
                  </option>
                );
              })}
            </select>

            <div className="d-inline h-100 fs-5">₹{finalPrice}/-</div>
          </div>

          <button className="btn bg-warning" onClick={handleAddToCart}>
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
