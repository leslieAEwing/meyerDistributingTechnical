import React from 'react';
import StarRating from './StarRating';

class Product extends React.Component {
  render() {
    const product = this.props.product;
    return (
      <div key={product.id} className="group relative p-4 border-r border-b border-gray-200 sm:p-6 h-1/6">
        <div className=" overflow-hidden group-hover:opacity-75">
          <img src={product.image_link} alt='' className="w-1/5 h-1/5 mx-auto" />
        </div>
        <div className="pt-10 pb-4 text-center">
          <h3 className="text-sm font-medium text-gray-900">
            <a href={product.product_link}>
              {/* <span aria-hidden="true" className="absolute inset-0" /> */}
              {product.name}
            </a>
          </h3>
          <StarRating product={product}/>

          <p className="mt-4 text-base font-medium text-gray-900">{product.price}</p>
          <button onClick={() => this.props.ShowMore? this.props.ShowMore(product):null} type="button" className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">See More</button>
        </div>
      </div>
    );
  }
}
export default Product;
