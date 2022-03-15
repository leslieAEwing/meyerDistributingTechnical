import React from 'react';
import Product from './Product';
import SeeMoreModal from './SeeMoreModal';

class ProductDisplay extends React.Component {
  constructor(){
    super();
    this.selected = null;
    this.showModal = false;
  }
  render() {
    const products = this.props.products;
    const selected = this.selected;
    const showModal = this.showModal;
    return (
      <div className="bg-white">
        <SeeMoreModal product={selected} open={showModal} onClose={()=> {this.showModal = false; this.forceUpdate() }}/>
        <div className="max-w-7xl mx-auto overflow-hidden sm:px-6 lg:px-8">
          <div className="-mx-px border-l border-gray-200 grid grid-cols-2 sm:mx-0 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product,i) => (
              <Product key={i} product={product} ShowMore={product => { this.selected = product; this.showModal = true; this.forceUpdate()}}/>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default ProductDisplay;