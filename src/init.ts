import { Cards, Products, CategoryCards } from './card';
import { Filters, BrandCard } from './filtersCategoryBrand';

class Initialization {
    cards;
    cardsCategory: CategoryCards;
    cardsBrands: BrandCard
    cardsCategoryBrand;
    categoryText: string | undefined
    brandText: string | undefined
    constructor() {
        this.cardsCategory = {};
        this.cardsBrands = {};
        this.cards = new Cards();
        this.cardsCategoryBrand = new Filters();
        this.categoryText = ''
        this.brandText = ''
    }
    init() {
        this.cards.getDefaultCards();
        this.cardsCategoryBrand.appendItemsFilterCategory();
        this.cardsCategoryBrand.appendItemsFilterBrands()
        window.addEventListener('click', (e: Event) => {
            this.windowClickHandler(e);
        });
    }
    windowClickHandler(e: Event) {
        const target = e.target as Element;
        if (!target) return;

        this.filtersClickHandler(target);
    }
    filtersClickHandler(target: Element) {
        const category: HTMLInputElement | null = target.closest('.category-mark');
        const brand: HTMLInputElement | null = target.closest('.brand-mark');
        // if(category || brand){
        //     if(category?.checked){
        //         this.brandClickHandler(brand)  
        //     }
        // }
        this.categoryClickHandler(category);
        this.brandClickHandler(brand)
    }
    categoryClickHandler(category: HTMLInputElement | null) {

        if (category) {
            this.categoryText = category.dataset.category;
            if (category.checked) {


                if (Object.keys(this.cardsBrands).length > 0) {

                    for (let cardCategory in this.cardsBrands) {
                        for (let card of this.cardsBrands[cardCategory]) {
                            if (card.category === this.categoryText) {
                                if (!this.cardsCategory[this.categoryText]) {
                                    this.cardsCategory[this.categoryText] = [card];
                                } else {
                                    this.cardsCategory[this.categoryText].push(card)
                                }

                            }
                        }
                    }


                    this.cards.setBrandCategoryCards(this.cardsCategory);
                    return
                }


                if (this.categoryText) {
                    const listCardsCategory = this.cardsCategoryBrand.categoryCards[this.categoryText];
                    this.cardsCategory[this.categoryText] = listCardsCategory;

                    this.cards.setBrandCategoryCards(this.cardsCategory);

                }
            } else {
                if (this.categoryText) {
                    delete this.cardsCategory[this.categoryText];
                    this.cards.setBrandCategoryCards(this.cardsCategory);
                }
                if (Object.keys(this.cardsBrands).length === 0 && Object.keys(this.cardsCategory).length === 0) {
                    this.cards.getDefaultCards();
                }
                else {
                    let brandCard: HTMLInputElement | null = document.querySelector(`[data-brand="${this.brandText}"]`);

                    if (brandCard) {
                        this.brandClickHandler(brandCard)
                    }
                }
            }
        }
    }
    brandClickHandler(brand: HTMLInputElement | null) {
        if (brand) {
            this.brandText = brand.dataset.brand;
            if (brand.checked) {



                if (Object.keys(this.cardsCategory).length > 0) {

                    for (let cardBrand in this.cardsCategory) {
                        for (let card of this.cardsCategory[cardBrand]) {
                            if (card.brand === this.brandText) {
                                if (!this.cardsBrands[this.brandText]) {
                                    this.cardsBrands[this.brandText] = [card];
                                } else {
                                    this.cardsBrands[this.brandText].push(card)
                                }

                            }
                        }
                    }


                    this.cards.setBrandCategoryCards(this.cardsBrands);
                    return
                }

                if (this.brandText) {
                    const listCardsBrands = this.cardsCategoryBrand.branCards[this.brandText];
                    this.cardsBrands[this.brandText] = listCardsBrands;

                    this.cards.setBrandCategoryCards(this.cardsBrands);
                }
            }
            else {
                if (this.brandText) {
                    delete this.cardsBrands[this.brandText];
                    this.cards.setBrandCategoryCards(this.cardsBrands);
                }
                if (Object.keys(this.cardsBrands).length === 0 && Object.keys(this.cardsCategory).length === 0) {
                    this.cards.getDefaultCards();
                }
                else {
                    let catergoryCard: HTMLInputElement | null = document.querySelector(`[data-category="${this.categoryText}"]`);

                    if (catergoryCard) {
                        this.categoryClickHandler(catergoryCard)
                    }
                }
            }
        }
    }
}

export default Initialization;
