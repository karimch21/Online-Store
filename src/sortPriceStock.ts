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
    listPrice: number[];
    listStock: number[];
    cardsPrices: Products[];
    cardsStocks: Products[];
    sortCardsPrices: Products[];
    sortCardsStock: Products[];
    cardsProduct;
    constructor() {
        this.listProducts = cards.products;
        this.cardsPrices = JSON.parse(JSON.stringify(this.listProducts));
        this.cardsStocks = JSON.parse(JSON.stringify(this.listProducts));
        this.maxPrice = 100;
        this.minPrice = 0;
        this.maxStock = 0;
        this.minStock = 10;
        this.listPrice = [];
        this.listStock = []
        this.cardsProduct = new Cards();
        this.sortCardsPrices = []
        this.sortCardsStock = []
    }
    sorting() {
        let minPrice: number = this.cardsPrices[0].price;
        let maxPrice: number = this.cardsPrices[1].price;
        let minStock: number = this.cardsStocks[0].stock;
        let maxStock: number = this.cardsStocks[1].stock;

        this.cardsPrices.sort((cardA: Products, cardB: Products) => {
            if (maxPrice < cardA.price) {
                maxPrice = cardA.price;
            }
            if (minPrice > cardA.price) {
                minPrice = cardA.price;
            }
            if (maxStock < cardA.stock) {
                maxStock = cardA.stock;
            }
            if (minStock > cardA.stock) {
                minStock = cardA.stock;
            }
            if (cardA.price < cardB.price) {
                return -1;
            }
            if (!this.listPrice.includes(cardA.price)) {
                this.listPrice.push(cardA.price);
            }
            if (!this.listPrice.includes(cardB.price)) {
                this.listPrice.push(cardB.price);
            }

            return 1;
        });

        this.listPrice.sort((numA: number, numB: number) => numA - numB);
        if (this.sortCardsStock.length > 1) {

        }
        this.maxPrice = maxPrice;
        this.minPrice = minPrice;
        this.maxStock = maxStock;
        this.minStock = minStock;
        console.log(this.cardsPrices, this.listPrice);


    }
    sortingStock() {
        
        let minStock: number = this.cardsStocks[0].stock;
        let maxStock: number = this.cardsStocks[1].stock;
        
        this.cardsStocks.sort((cardA: Products, cardB: Products) => {
            if (!this.listStock.includes(cardA.stock)) {
                this.listStock.push(cardA.stock);
            }
            if (!this.listStock.includes(cardB.stock)) {
                this.listStock.push(cardB.stock);
            }
            if (cardA.stock < cardB.stock) {
                return -1;
            }
           

            return 1;
        });

        this.listStock.sort((numA: number, numB: number) => numA - numB);
      
    }
    createFilterPrice() {
        const filter = document.createElement('div');
        const filterTitle = document.createElement('div');
        const priceFromTo = document.createElement('div');
        const priceFrom = document.createElement('div');
        const priceTo = document.createElement('div');
        const boxFilter = document.createElement('div');
        const lowerRange = document.createElement('input');
        const upperRange = document.createElement('input');

        filter.classList.add('filter', 'filters__price');
        filterTitle.classList.add('filter__titile');
        priceFromTo.classList.add('filter__price-box', 'filter__data-box');
        priceFrom.classList.add('filter__price-from');
        priceTo.classList.add('filter__price-to');
        boxFilter.classList.add('box-range-filter', 'range-filter');
        lowerRange.classList.add('range-filter__lower', 'price-lower');
        upperRange.classList.add('range-filter__upper', 'price-upper');

        filterTitle.textContent = 'Price';
        priceFrom.textContent = this.minPrice.toString();
        priceTo.textContent = this.maxPrice.toString();
        lowerRange.type = 'range';
        upperRange.type = 'range';
        lowerRange.min = (0).toString();
        upperRange.min = (0).toString();
        lowerRange.max = (this.listPrice.length - 1).toString();
        upperRange.max = (this.listPrice.length - 1).toString();
        lowerRange.value = (0).toString();
        upperRange.value = this.listPrice.length.toString();

        boxFilter.appendChild(lowerRange);
        boxFilter.appendChild(upperRange);
        filter.appendChild(filterTitle);
        priceFromTo.appendChild(priceFrom);
        priceFromTo.appendChild(priceTo);
        filter.appendChild(priceFromTo);
        filter.appendChild(boxFilter);
        return filter;
    }
    createFilterStock() {
        const filter = document.createElement('div');
        const filterTitle = document.createElement('div');
        const stockFromTo = document.createElement('div');
        const stockFrom = document.createElement('div');
        const stockTo = document.createElement('div');
        const boxFilter = document.createElement('div');
        const lowerRange = document.createElement('input');
        const upperRange = document.createElement('input');

        filter.classList.add('filter', 'filters__stock');
        filterTitle.classList.add('filter__titile');
        stockFromTo.classList.add('filter__stock-box', 'filter__data-box');
        stockFrom.classList.add('filter__stock-from');
        stockTo.classList.add('filter__stock-to');
        boxFilter.classList.add('box-range-filter', 'range-filter');
        lowerRange.classList.add('range-filter__lower', 'stock-lower');
        upperRange.classList.add('range-filter__upper', 'stock-upper');

        filterTitle.textContent = 'Stock';
        stockFrom.textContent = this.minStock.toString();
        stockTo.textContent = this.maxStock.toString();
        lowerRange.type = 'range';
        upperRange.type = 'range';
        lowerRange.min = (0).toString();
        upperRange.min = (0).toString();
        lowerRange.max = (this.listStock.length - 1).toString();
        upperRange.max = (this.listStock.length - 1).toString();
        lowerRange.value = (0).toString();
        upperRange.value = (this.listStock.length).toString();

        boxFilter.appendChild(lowerRange);
        boxFilter.appendChild(upperRange);
        filter.appendChild(filterTitle);
        stockFromTo.appendChild(stockFrom);
        stockFromTo.appendChild(stockTo);
        filter.appendChild(stockFromTo);
        filter.appendChild(boxFilter);
        return filter;
    }
    appendFilterPrice() {
        const filtersFrom: HTMLFormElement | null = document.querySelector('.form-filters');
        if (filtersFrom) {
            const priceFilter = this.createFilterPrice();
            filtersFrom.appendChild(priceFilter);
        }
    }
    appendFilterStock() {
        const filtersFrom: HTMLFormElement | null = document.querySelector('.form-filters');
        if (filtersFrom) {
            const stockFilter = this.createFilterStock();
            filtersFrom.appendChild(stockFilter);
        }
    }
    initSortSliders() {
        this.sorting()
        this.sortingStock()
        this.appendFilterPrice();
        this.appendFilterStock();
        this.initPriceSlider();
        this.initStockSlider()
    }
    initPriceSlider() {
        const priceLowerSlider = document.querySelector('.price-lower') as HTMLInputElement,
            priceUpperSlider = document.querySelector('.price-upper') as HTMLInputElement,
            lowerVal: number = parseInt(priceLowerSlider.value),
            upperVal: number = parseInt(priceUpperSlider.value);
        const priceFrom = document.querySelector('.filter__price-from');
        const priceTo = document.querySelector('.filter__price-to');
        const stockFrom = document.querySelector('.filter__stock-from');
        const stockTo = document.querySelector('.filter__stock-to');
        let sortedProductsPrice: Products[] = [];
        let sortedProductsUpperSlider: Products[] = [];
        let sortedProductsLowerSlider: Products[] = [];

        let startPriceLowerSlider: number;
        let startIndexLowerSlider: number;

        let endPriceUpperSlider: number;
        let endIndexUpperSlider: number;

        priceUpperSlider.addEventListener('input', () => {
            if (priceTo) {
                priceTo.textContent = this.listPrice[+priceUpperSlider.value].toString();
            }
        });
        priceLowerSlider.addEventListener('change', () => {
            const startPrice: number = this.listPrice[+priceLowerSlider.value];
            startPriceLowerSlider = startPrice;
            if (sortedProductsPrice.length > 1 && sortedProductsUpperSlider.length > 1) {
                const startIndex: number = this.findIndexPriceProduct(this.cardsPrices, startPrice);
                startIndexLowerSlider = this.findIndexPriceProduct(this.cardsPrices, startPrice);

                sortedProductsPrice = this.cardsPrices.slice(startIndexLowerSlider, endIndexUpperSlider + 1);
                console.log(-1, sortedProductsPrice);

                sortedProductsLowerSlider = this.cardsPrices.slice(startIndex);
            } else {
                const startIndex: number = this.findIndexPriceProduct(this.cardsPrices, startPrice);
                startIndexLowerSlider = startIndex;
                sortedProductsPrice = this.cardsPrices.slice(startIndex);
                console.log('start', sortedProductsPrice);
                sortedProductsLowerSlider = this.cardsPrices.slice(startIndex);
            }
            this.sortCardsPrices = sortedProductsPrice;
            this.cardsProduct.setBrandCategoryCards({ cards: sortedProductsPrice })
        });
        priceUpperSlider.addEventListener('change', () => {
            const endPrice: number = this.listPrice[+priceUpperSlider.value];
            endPriceUpperSlider = endPrice;
            console.log(this.findIndexPriceProduct(this.cardsPrices, endPrice));
            if (sortedProductsPrice.length > 1 && sortedProductsLowerSlider.length > 1) {
                const endIndex: number = this.findIndexPriceProduct(this.cardsPrices, endPrice);
                endIndexUpperSlider = this.findIndexPriceProduct(this.cardsPrices, endPrice);

                sortedProductsPrice = this.cardsPrices.slice(startIndexLowerSlider, endIndexUpperSlider + 1);
                console.log(-1, sortedProductsPrice);

                sortedProductsUpperSlider = this.cardsPrices.slice(0, endIndex + 1);
            } else {
                const endIndex: number = this.findIndexPriceProduct(this.cardsPrices, endPrice);
                endIndexUpperSlider = endIndex;
                sortedProductsPrice = this.cardsPrices.slice(0, endIndex + 1);
                sortedProductsUpperSlider = this.cardsPrices.slice(0, endIndex + 1);
                console.log('end', sortedProductsPrice);
            }
            this.sortCardsPrices = sortedProductsPrice;
            this.cardsProduct.setBrandCategoryCards({ cards: sortedProductsPrice })
        });
        priceLowerSlider.addEventListener('input', () => {
            if (priceFrom) {
                priceFrom.textContent = this.listPrice[+priceLowerSlider.value].toString();
            }
        });
    }
    initStockSlider() {
        const stockLowerSlider = document.querySelector('.stock-lower') as HTMLInputElement,
            stockUpperSlider = document.querySelector('.stock-upper') as HTMLInputElement,
            lowerVal: number = parseInt(stockLowerSlider.value),
            upperVal: number = parseInt(stockUpperSlider.value);
        const stockFrom = document.querySelector('.filter__stock-from');
        const stockTo = document.querySelector('.filter__stock-to');

        let sortedProductsStock: Products[] = [];
        let sortedProductsUpperSlider: Products[] = [];
        let sortedProductsLowerSlider: Products[] = [];

        let startStockLowerSlider: number;
        let startIndexLowerSlider: number;

        let endStockUpperSlider: number;
        let endIndexUpperSlider: number;

        stockUpperSlider.addEventListener('input', () => {
            if (stockTo) {
                stockTo.textContent = this.listStock[+stockUpperSlider.value].toString();
            }
        });
        stockLowerSlider.addEventListener('change', () => {
            const startStock: number = this.listStock[+stockLowerSlider.value];
            
            startStockLowerSlider = startStock;
            if (sortedProductsStock.length > 1 && sortedProductsUpperSlider.length > 1) {
                const startIndex: number = this.findIndexStockProduct(this.cardsStocks, startStock);
                startIndexLowerSlider = this.findIndexStockProduct(this.cardsStocks, startStock);

                sortedProductsStock = this.cardsStocks.slice(startIndexLowerSlider, endIndexUpperSlider + 1);
                console.log(-1, sortedProductsStock);

                sortedProductsLowerSlider = this.cardsStocks.slice(startIndex);
            } else {
                const startIndex: number = this.findIndexStockProduct(this.cardsStocks, startStock);
               
                startIndexLowerSlider = startIndex;
                sortedProductsStock = this.cardsStocks.slice(startIndex);
                console.log('start', sortedProductsStock);
                sortedProductsLowerSlider = this.cardsStocks.slice(startIndex);
            }

            this.cardsProduct.setBrandCategoryCards({ cards: sortedProductsStock })
        });
        stockUpperSlider.addEventListener('change', () => {
            const endStock: number = this.listStock[+stockUpperSlider.value];
            endStockUpperSlider = endStock;
            console.log(this.findIndexStockProduct(this.cardsStocks, endStock));
            if (sortedProductsStock.length > 1 && sortedProductsLowerSlider.length > 1) {
                const endIndex: number = this.findIndexStockProduct(this.cardsStocks, endStock);
                endIndexUpperSlider = this.findIndexStockProduct(this.cardsStocks, endStock);

                sortedProductsStock = this.cardsStocks.slice(startIndexLowerSlider, endIndexUpperSlider + 1);
                console.log(-1, sortedProductsStock);

                sortedProductsUpperSlider = this.cardsStocks.slice(0, endIndex + 1);
            } else {
                const endIndex: number = this.findIndexStockProduct(this.cardsStocks, endStock);
                endIndexUpperSlider = endIndex;
                sortedProductsStock = this.cardsStocks.slice(0, endIndex + 1);
                sortedProductsUpperSlider = this.cardsStocks.slice(0, endIndex + 1);
                console.log('end', sortedProductsStock);
            }
            this.cardsProduct.setBrandCategoryCards({ cards: sortedProductsStock })
        });
        stockLowerSlider.addEventListener('input', () => {
            if (stockFrom) {
                stockFrom.textContent = this.listStock[+stockLowerSlider.value].toString();
            }
        });
    }
    findIndexPriceProduct(arr: Products[], num: number) {
        let left = 0;
        let right: number = arr.length - 1;
        let mid: number;

        while (left <= right) {
            mid = Math.floor((right + left) / 2);

            if (arr[mid].price === num) {
                return mid;
            } else if (arr[mid].price > num) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }

        return -1;
    }
    findIndexStockProduct(arr: Products[], num: number) {
        let left = 0;
        let right: number = arr.length - 1;
        let mid: number;
       
        while (left <= right) {
            mid = Math.floor((right + left) / 2);

            if (arr[mid].stock === num) {
                return mid;
            } else if (arr[mid].stock > num) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }

        return -1;
    }
}

export default SortingPriceStock;
