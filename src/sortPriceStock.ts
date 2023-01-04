import cards from './bd/products.json';
import { Cards, Products } from './card';

type BrandCard = { [index: string]: Products[] };
interface CategoryCard {
  [index: string]: BrandCard;
}

class SortingPriceStock {
  listProducts: Products[];
  maxPrice: number;
  minPrice: number;
  maxStock: number;
  minStock: number;
  listPrice: number[]
  constructor() {
    this.listProducts = cards.products;
    this.maxPrice = 100;
    this.minPrice = 0;
    this.maxStock = 0
    this.minStock = 10
    this.listPrice = [];
  }
  sorting() {
    let minPrice: number = this.listProducts[0].price;
    let maxPrice: number = this.listProducts[1].price;
    let minStock: number = this.listProducts[0].stock;
    let maxStock: number = this.listProducts[1].stock;

    this.listProducts.sort((cardA: Products, cardB: Products) => {
      if (maxPrice < cardA.price) {
        maxPrice = cardA.price
      }
      if (minPrice > cardA.price) {
        minPrice = cardA.price;
      }
      if (maxStock < cardA.stock) {
        maxStock = cardA.stock
      }
      if (minStock > cardA.stock) {
        minStock = cardA.stock;
      }
      if (cardA.price < cardB.price) {
        return -1;
      }
      if (!this.listPrice.includes(cardA.price)) {
        this.listPrice.push(cardA.price)
      }
      if (!this.listPrice.includes(cardB.price)) {
        this.listPrice.push(cardB.price)
      }
      
      return 1
    });
    this.listPrice.sort((numA:number, numB:number)=> numA - numB);
  
    this.maxPrice = maxPrice;
    this.minPrice = minPrice;
    this.maxStock = maxStock;
    this.minStock = minStock;
    console.log(this.listProducts, this.listPrice)
  }
  createFilterPrice() {
    let filter = document.createElement('div');
    let filterTitle = document.createElement('div');
    let priceFromTo = document.createElement('div');
    let priceFrom = document.createElement('div');
    let priceTo = document.createElement('div');
    let boxFilter = document.createElement('div');
    let lowerRange = document.createElement('input');
    let upperRange = document.createElement('input');

    filter.classList.add('filter', 'filters__price');
    filterTitle.classList.add('filter__titile');
    priceFromTo.classList.add('filter__price-box', 'filter__data-box');
    priceFrom.classList.add('filter__price-from');
    priceTo.classList.add('filter__price-to')
    boxFilter.classList.add('box-range-filter', 'range-filter')
    lowerRange.classList.add('range-filter__lower', 'price-lower');
    upperRange.classList.add('range-filter__upper', 'price-upper');


    filterTitle.textContent = 'Price'
    priceFrom.textContent = (this.minPrice).toString()
    priceTo.textContent = (this.maxPrice).toString()
    lowerRange.type = 'range';
    upperRange.type = 'range';
    lowerRange.min = (0).toString();
    upperRange.min = (0).toString();
    lowerRange.max = (this.listPrice.length - 1).toString();
    upperRange.max = (this.listPrice.length - 1).toString();
    lowerRange.value = (this.listPrice.length).toString();
    upperRange.value = (0).toString();

    
    boxFilter.appendChild(lowerRange)
    boxFilter.appendChild(upperRange)
    filter.appendChild(filterTitle)
    priceFromTo.appendChild(priceFrom)
    priceFromTo.appendChild(priceTo)
    filter.appendChild(priceFromTo);
    filter.appendChild(boxFilter);
    return filter
  }
  createFilterStock() {
    let filter = document.createElement('div');
    let filterTitle = document.createElement('div');
    let stockFromTo = document.createElement('div');
    let stockFrom = document.createElement('div');
    let stockTo = document.createElement('div');
    let boxFilter = document.createElement('div');
    let lowerRange = document.createElement('input');
    let upperRange = document.createElement('input');

    filter.classList.add('filter', 'filters__stock');
    filterTitle.classList.add('filter__titile');
    stockFromTo.classList.add('filter__stock-box', 'filter__data-box');
    stockFrom.classList.add('filter__stock-from');
    stockTo.classList.add('filter__stock-to')
    boxFilter.classList.add('box-range-filter', 'range-filter')
    lowerRange.classList.add('range-filter__lower');
    upperRange.classList.add('range-filter__upper');


    filterTitle.textContent = 'Stock'
    stockFrom.textContent = (this.minStock).toString()
    stockTo.textContent = (this.maxStock).toString()
    lowerRange.type = 'range';
    upperRange.type = 'range';
    lowerRange.min = (this.minStock).toString()
    upperRange.min = (0).toString()
    lowerRange.max = (this.maxStock).toString()
    upperRange.max = (this.maxStock).toString()
    lowerRange.value = (this.minStock).toString()
    upperRange.value = (this.maxStock).toString()

    boxFilter.appendChild(lowerRange)
    boxFilter.appendChild(upperRange)
    filter.appendChild(filterTitle)
    stockFromTo.appendChild(stockFrom)
    stockFromTo.appendChild(stockTo)
    filter.appendChild(stockFromTo);
    filter.appendChild(boxFilter);
    return filter
  }
  appendFilterPrice() {
    let filtersFrom: HTMLFormElement | null = document.querySelector('.form-filters');
    if (filtersFrom) {
      let priceFilter = this.createFilterPrice();
      filtersFrom.appendChild(priceFilter)
    }
  }
  appendFilterStock() {
    let filtersFrom: HTMLFormElement | null = document.querySelector('.form-filters');
    if (filtersFrom) {
      let stockFilter = this.createFilterStock();
      filtersFrom.appendChild(stockFilter)
    }
  }
  initPriceStockSLliders() {
    this.appendFilterPrice()
    this.appendFilterStock()
    let priceLowerSlider = document.querySelector('.price-lower') as HTMLInputElement,
      priceUpperSlider = document.querySelector('.price-upper') as HTMLInputElement,
      lowerVal: number = parseInt(priceLowerSlider.value),
      upperVal: number = parseInt(priceUpperSlider.value);
    let priceFrom = document.querySelector('.filter__price-from');
    let priceTo = document.querySelector('.filter__price-to');
    let stockFrom = document.querySelector('.filter__stock-from');
    let stockTo = document.querySelector('.filter__stock-to');
    

    priceUpperSlider.addEventListener('input', (e:Event)=> {
      if (priceFrom) {
        priceFrom.textContent = (this.listPrice[+priceUpperSlider.value]).toString();
      }
    })

    priceLowerSlider.addEventListener('input', () => {
      if (priceTo) {
        priceTo.textContent = (this.listPrice[+priceLowerSlider.value]).toString();
      }
    })

  }
  sortRangePrice(arr:Products[], num:number) {
    let left:number = 0;
    let right:number = arr.length - 1;
    let mid:number;
  
    while (left <= right) {
      mid = Math.floor((right + left) / 2);
  
      if (arr[mid].price === i) {
        return mid;
      } else if (arr[mid].price > i) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }
  
    return -1;
  }
}

export default SortingPriceStock