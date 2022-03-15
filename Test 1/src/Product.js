import React from 'react'
import products from './db'
import "./Product.css"

function Product (props) {

  function moreInfo(){
    document.getElementById(`${props.id}`).style.display = "block"
  }
  function closeInfo(){
    document.getElementById(`${props.id}`).style.display = "none"
  }
  

  function colorOption(){
    if(props.color.length > 0){
          // {props.color.map((color) => {
          //   <li>{color.colour_name}</li>
          // })}
          return (
            <>
              {props.color[0]}
            </>
          )
    }
  }

  function ratingExists(){
    if(props.rating === null){
      return <>&#x2605;</>
    }
  }

  return (
    <>
    <div className='product-index'>
      <img src={props.image}></img>
      <p><strong>{props.name}</strong></p>
      <p>${props.price}</p>
      <p>Rating: {props.rating}{ratingExists}</p>
      <span className='open-modal' onClick={moreInfo}>+View More</span>
    </div>
    <div id={props.id} className='modal'>
      <div className='modal-content'>
        <span className="close" onClick={closeInfo}>&times;</span>
        <div className='partition1'>
          <img src={props.image} alt={props.name}></img>
          <p>Rated <strong>{props.rating}</strong> &#x2605;</p>
        </div>
        <div className='partition2'>
          <h4 className='product-name'>{props.name}</h4>
          <p>Details: <br/>{props.description}</p>
          <p className='product-price'><strong>${props.price}</strong></p>
          <a href={props.link} target="_blank">Check it out here!</a>
          <ul>
            {colorOption}
          </ul>
        </div>
      </div>
    </div>
    </>
  )
}

export default Product