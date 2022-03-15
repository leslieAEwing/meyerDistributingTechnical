import React from 'react'
import products from './db'
import Product from './Product'
import "./Home.css"
import Header from './Header'

function Home() {

  function productTypeList(){
    let productType = {}
    products.forEach((item, index) => {
      productType[item.product_type] = item.product_type
    })
    return(
      <>
      {productType.forEach(type => {
        <label> 
          <input name='product-type' type="checkbox" />
          {type} 
        </label>
      })}
      </>
    )
  }

  return (
    <>
    <Header />
    <div className='contain'>
    <a>
      <h4 className='filter-header'>Filter Products</h4>
      <h5>Price</h5>
      <label> 
        <input name='price' type="checkbox" />
        $0 - $10  
      </label>
      <label>  
        <input name='price' type="checkbox" />
        $10 - $20 
      </label>
      <label> 
        <input name='price' type="checkbox" />
        $20+
      </label>
      <h5>Product Type</h5>
        {productTypeList}
      {/* <label> 
        <input name='product-type' type="checkbox" />
        $0 - $10  
      </label>
      <label>  
        <input name='price' type="checkbox" />
        $10 - $20 
      </label>
      <label> 
        <input name='price' type="checkbox" />
        $20+
      </label> */}

      <h5>Rating</h5>
      <label> 
        <input name='star' type="checkbox" />
        1 &#x2605;
      </label>
      <label>  
        <input name='star' type="checkbox" />
        2 &#x2605;
      </label>
      <label> 
        <input name='star' type="checkbox" />
        3 &#x2605;
      </label>
      <label> 
        <input name='star' type="checkbox" />
        4 &#x2605;
      </label>
      <label> 
        <input name='star' type="checkbox" />
        5 &#x2605;
      </label>
      <label> 
        <input name='star' type="checkbox" />
        No Reviews
      </label>

      <h5>Color</h5>
      {/* <label> 
        <input name='price' type="checkbox" />
        $0 - $10  
      </label>
      <label>  
        <input name='price' type="checkbox" />
        $10 - $20 
      </label>
      <label> 
        <input name='price' type="checkbox" />
        $20+
      </label> */}
    </a>
    <div className='home'>
    {products.map((product) => <Product name={product.name} 
      price={product.price}
      rating={product.rating}
      image={product.image_link}
      description={product.description}
      color={product.product_colors}
      id={product.id}
      link={product.product_link}
    />)}
    </div>
    </div>
    </>
  )
}

export default Home