import React from 'react';
import data from './data.json';
import ProductDisplay from './ProductDisplay.js';
import Navbar from './Navbar';
//const categories = [...new Set(data.map(d => d.category))].filter(c => c).sort().map((c,i) => {return {"id":i,"name":c, checked:false}});
const product_type = [...new Set(data.map(d => d.product_type))].filter(p => p).sort().map((c,i) => {return {"id":i,"name":c, checked:false}});
const colors = [...new Set(data.map(d => d.product_colors.map(c => c.colour_name)).flat())].filter(p => p).sort().map((c,i) => {return {"id":i,"name":c, checked:false}});
const prices = [
  {label:"$1-$8",min:1,max:8,checked:false},{label:"$8-$12",min:8,max:12,checked:false},{label:"$12-$20",min:12,max:20,checked:false}
];
let sortOptions = [
  { name: 'Price Desc', current: false },
  { name: 'Best Rating', current: false },
]
const ratings = [0, 1, 2, 3, 4,5].map((rating,id) => {return {rating,id, "name":rating}});
class App extends React.Component {
  constructor(){
    super()
    this.state = {colors:[],prices:[],types:[],ratings:[],paginate:{page:1}};
    this.onColorToggle = this.onColorToggle.bind(this)
    this.onTypeToggle = this.onTypeToggle.bind(this)
    this.onPriceToggle = this.onPriceToggle.bind(this)
    this.onRatingsToggle = this.onRatingsToggle.bind(this)
    this.onSortToggle = this.onSortToggle.bind(this)
    this.clearFilters = this.clearFilters.bind(this)
    this.onPageTurn = this.onPageTurn.bind(this)
    this.onPerPageChange = this.onPerPageChange.bind(this)
  }

  onRatingsToggle(rating){
    if(!rating.checked){
      this.state.ratings.push(rating)
      rating.checked = true;
    }
    else{
      rating.checked = false;
      let position = this.state.ratings.indexOf(rating);
      if ( ~position ) this.state.ratings.splice(position, 1);
    }
    this.onPageTurn(1);
    this.forceUpdate();
  }

  onTypeToggle(type){
    if(!type.checked){
      this.state.types.push(type)
      type.checked = true;
    }
    else{
      type.checked = false;
      let position = this.state.types.indexOf(type);
      if ( ~position ) this.state.types.splice(position, 1);
    }
    this.onPageTurn(1);
    this.forceUpdate();
  }

  onColorToggle(color){
    if(!color.checked){
      this.state.colors.push(color.name)
      color.checked = true;
    }
    else{
      color.checked = false;
      let position = this.state.colors.indexOf(color.name);
      if ( ~position ) this.state.colors.splice(position, 1);
    }
    this.onPageTurn(1);
    this.forceUpdate();
  }

  clearFilters(){
    // this.state = {colors:[],prices:[],types:[],ratings:[]};
    this.forceUpdate();
  }

  onPriceToggle(price){
    if(!price.checked){
      this.state.prices.push(price)
      price.checked = true;
    }
    else{
      price.checked = false;
      let position = this.state.prices.indexOf(price);
      if ( ~position ) this.state.prices.splice(position, 1);
    }
    this.onPageTurn(1);
    this.forceUpdate();
  }

  onSortToggle(sortOption){
    sortOption.current = !sortOption.current;
    sortOptions = sortOptions.map(s => s === sortOption? {...s,current:sortOption.current} : {...s,current:false})
    this.onPageTurn(1);
    this.forceUpdate();
  }

  onPageTurn(toPage){
    let state = Object.assign({}, this.state);
    state.paginate.page = toPage;
    this.setState({state})
    this.forceUpdate();
  }

  onPerPageChange(numPerPage){
    let state = Object.assign({}, this.state);
    state.paginate.perPage = numPerPage;
    this.setState({state})
    this.forceUpdate();
  }

  render(){
    let state = Object.assign({}, this.state);
    const products = filter(data,this.state).sort((a, b) => sortSelector.call({a,b},sortOptions.find(so=> so.current)));
    state.paginate.data = paginate(products,this.state.paginate.page,this.state.paginate.perPage)
    const displayedProducts = this.state.paginate.data.items;

    return (
      <div>
        <header className="sticky top-0 z-50">
          <Navbar onPerPageChange={this.onPerPageChange} onPageTurn={this.onPageTurn} paginate={state.paginate} clearFilters={this.clearFilters} sortOptions={sortOptions} onSortToggle={this.onSortToggle} colors={colors} onColorToggle={this.onColorToggle} prices={prices} onPriceToggle={this.onPriceToggle} types={product_type} onTypeToggle={this.onTypeToggle} ratings={ratings} onRatingToggle={this.onRatingsToggle}/>
        </header>
        <main className="relative">
          <ProductDisplay products={displayedProducts}/>
        </main>
      </div>
    );
  }
}

function filter(data,filters){
  if(filters.colors.length > 0)
    data = data.filter(d => d.product_colors.some(c => filters.colors.includes(c.colour_name)))
  if(filters.prices.length > 0)
    data = data.filter(d => filters.prices.some(f => f.min < d.price && d.price < f.max))
  if(filters.types.length > 0)
    data = data.filter(d => filters.types.some(f => f.name === d.product_type))
  if(filters.ratings.length > 0)
    data = data.filter(d => filters.ratings.some(r=> Math.floor(d.rating) === r.name))
  return data;
}

function sortSelector(selected){
  const {a,b} = this;
  if (selected)
        switch(selected.name){
          case 'Price Desc':
            return parseFloat(a.price) > parseFloat(b.price)
          case 'Best Rating':
            return (a.rating > b.rating) ? 1 : -1;
          default:
            return a.id < b.id;
        }
    return a.id < b.id
}

function paginate(items, page = 1, perPage = 10){
  const offset = perPage * (page - 1);
  const totalPages = Math.ceil(items.length / perPage);
  const paginatedItems = items.slice(offset, perPage * page);

  return {
      previousPage: page - 1 ? page - 1 : null,
      nextPage: (totalPages > page) ? page + 1 : null,
      total: items.length,
      totalPages: totalPages,
      items: paginatedItems
  };
};

export default App;