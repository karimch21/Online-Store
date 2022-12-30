import { Cards, Products, CategoryCards } from './card';
import { Filters, BrandCard } from './filtersCategoryBrand';

type FilterCategoryBrand = { [index: string]: Products[] }

class Initialization {
    cards;
    filters;
    listBrands: FilterCategoryBrand;
    listCategories: FilterCategoryBrand;
    cardsCategory: FilterCategoryBrand;
    cardsBrands: FilterCategoryBrand;
    sotedCardsCategory: FilterCategoryBrand;
    sortedCardsBrands: FilterCategoryBrand;
    categoryText: string | undefined
    brandText: string | undefined
    constructor() {
        this.cards = new Cards();
        this.listBrands = {};
        this.listCategories = {};
        this.filters = new Filters();
        this.cardsCategory = {};
        this.cardsBrands = {};
        this.sotedCardsCategory = {};
        this.sortedCardsBrands = {};
        this.categoryText = '';
        this.brandText = ''
    }
    init() {
        this.cards.getDefaultCards();
        this.filters.appendItemsFilterCategory();
        this.filters.appendItemsFilterBrands()
        window.addEventListener('click', (e: Event) => {
            this.windowClickHandler(e);
        });
    }
    windowClickHandler(e: Event) {
        let target = e.target as Element;
        if (target) {
            this.clickCardCategoryHandler(target);
            this.clickCardBrandHandler(target);
        }
    }

    clickCardCategoryHandler(target: Element) {
        const category: HTMLInputElement | null = target.closest('.category-mark')
        if (category) {
            this.categoryText = category.dataset.category;
            if (this.categoryText) {
                if (category.checked) {
                    this.addNewCategory(this.categoryText)
                }
                else {
                    this.deleteCategory(this.categoryText)
                }
            }

        }
    }
    addNewCategory(categoryText: string) {
        let currentListProducts = this.filters.categoryCards[categoryText];
        if (Object.keys(this.listBrands).length > 0) {
            let products: Products[] = [];
            for (let brand of Object.keys(this.listBrands)) {
                for (let card of currentListProducts) {
                    if (card.brand === brand) {
                        products.push(card);
                    }
                }
            }
            console.log('--------')
            console.log(this.cardsCategory)
            console.log('--------')
            this.cardsCategory[categoryText] = products
            this.cards.setBrandCategoryCards(this.cardsCategory)
        } else {
            if (!this.cardsCategory[categoryText]) {
                this.cardsCategory[categoryText] = currentListProducts;
                this.listCategories[categoryText] = this.filters.categoryCards[categoryText];
            }
            else {
                this.cardsCategory[categoryText].push(...currentListProducts);
                this.listCategories[categoryText].push(...(this.filters.categoryCards[categoryText]));
            }

            this.cards.setBrandCategoryCards(this.cardsCategory)
        }
    }
    deleteCategory(categoryText: string) {
        delete this.cardsCategory[categoryText];
        delete this.listCategories[categoryText];

        if (Object.keys(this.cardsCategory).length === 0) {
            if (Object.keys(this.cardsBrands).length > 0) {
                console.log(1)
                this.cards.setBrandCategoryCards(this.listBrands)
            }
            else {
                console.log(2)
                this.cards.getDefaultCards();
            }
        }
        else {
            console.log(this.listBrands, 'GOVNO', this.cardsCategory)
            if (Object.keys(this.cardsBrands).length > 0) {
             
                for (let [categoryTitle, productsCategory] of Object.entries(this.cardsCategory)) {
                    let products:Products[] = [];
                    for (let brand of Object.keys(this.listBrands)) {
                        for(let card of productsCategory){
                            if (card.brand === brand) {
                               products.push(card)
                            }
                        } 
                    }
                    this.cardsCategory[categoryTitle] = products
                }

                this.cards.setBrandCategoryCards(this.cardsCategory);
            }
            else {
                this.cards.setBrandCategoryCards(this.cardsCategory);
            }
        }
    }
    clickCardBrandHandler(target: Element) {
        const brand: HTMLInputElement | null = target.closest('.brand-mark')
        if (brand) {
            this.brandText = brand.dataset.brand;
            if (this.brandText) {
                if (brand.checked) {
                    this.addNewBrand(this.brandText)
                }
                else {
                    this.deleteBrand(this.brandText)
                }
            }
        }
    }
    addNewBrand(brandText: string) {
        let currentListProducts = this.filters.branCards[brandText];
        if (!this.cardsBrands[brandText]) {
            this.listBrands[brandText] = this.filters.branCards[brandText]
        }
        else {
            this.listBrands[brandText].push(...(this.filters.branCards[brandText]))
        }
        if (Object.keys(this.listCategories).length > 0) {
            let products: Products[] = [];
            for (let category of Object.keys(this.listCategories)) {
                for (let card of currentListProducts) {
                    if (card.category === category) {
                        products.push(card);
                    }
                }
            }
            this.cardsBrands[brandText] = products;
            this.cards.setBrandCategoryCards(this.cardsBrands)
        } else {
            if (!this.cardsBrands[brandText]) {
                this.listBrands[brandText] = this.filters.branCards[brandText]
                this.cardsBrands[brandText] = currentListProducts;
            }
            else {
                this.listBrands[brandText].push(...(this.filters.branCards[brandText]))
                this.cardsBrands[brandText].push(...currentListProducts)
            }

            this.cardsBrands[brandText] = this.filters.branCards[brandText];
            this.cards.setBrandCategoryCards(this.cardsBrands)
        }
    }
    deleteBrand(brandText: string) {
        delete this.cardsBrands[brandText];
        delete this.listBrands[brandText];


        if (Object.keys(this.cardsBrands).length === 0) {
            if (Object.keys(this.cardsCategory).length > 0) {
                this.cards.setBrandCategoryCards(this.listCategories)
            }
            else {
                this.cards.getDefaultCards();
            }
        }
        else {
            if(Object.keys(this.cardsCategory).length > 0){
                
                for (let [categoryTitle, productsCategory] of Object.entries(this.cardsCategory)) {
                    let products:Products[] = [];
                    for (let brand of Object.keys(this.listBrands)) {
                        for(let card of productsCategory){
                            if (card.brand === brand) {
                               products.push(card)
                            }
                        } 
                    }
                    this.cardsCategory[categoryTitle] = products
                }
                console.log(this.cardsCategory)
                this.cards.setBrandCategoryCards(this.cardsCategory);
            }
            else{
                console.log(222)
                this.cards.setBrandCategoryCards(this.cardsBrands);
            }
        }

    }
}

export default Initialization;
