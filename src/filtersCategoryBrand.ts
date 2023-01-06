import cards from './bd/products.json';
import { Cards, Products } from './card';

type BrandCard = { [index: string]: Products[] };
interface CategoryCard {
    [index: string]: BrandCard;
}
type CategoriesCards = { [index: string]: Products[] };

class Filters {
    convertedCatergoryBrandCards: CategoryCard;
    categories: string[];
    categoryCards: CategoriesCards;
    branCards: BrandCard;
    brands: string[];

    constructor() {
        this.categoryCards = {};
        this.branCards = {};
        this.convertedCatergoryBrandCards = this.convertingCatergoryBrandCards();
        this.brands = Object.keys(this.branCards);
        this.categories = Object.keys(this.categoryCards);
    }
    convertingCatergoryBrandCards() {
        const sortedCatergoryBrand: CategoryCard = {};
        cards.products.forEach((card: Products) => {
            const category: string = card.category;
            const brand: string = card.brand;

            if (!this.categoryCards[category]) {
                this.categoryCards[category] = [card];
            } else {
                this.categoryCards[category].push(card);
            }

            if (!this.branCards[brand]) {
                this.branCards[brand] = [card];
            } else {
                this.branCards[brand].push(card);
            }

            if (!sortedCatergoryBrand[category]) {
                sortedCatergoryBrand[category] = {
                    [brand]: [card],
                };
            } else {
                if (!sortedCatergoryBrand[category][brand]) {
                    sortedCatergoryBrand[category][brand] = [card];
                } else {
                    sortedCatergoryBrand[category][brand].push(card);
                }
            }
        });

        return sortedCatergoryBrand;
    }
    createItemsFilterBrands() {
        const brandsFragment: DocumentFragment = document.createDocumentFragment();
        this.brands.forEach((brand: string) => {
            const filterItem = document.createElement('label');
            filterItem.classList.add('filter__item', 'filter__item-brand');
            const brandFilter = `
      <input type="checkbox" class="brand-mark" data-brand="${brand}">
      <span class="filter__item-title filter__brand-title">
          ${brand}
      </span>
      <div class="filter__item-amount filter__brand-amount">
        <span class="filter__item-current-total filter__brand-current-total"></span>
        <span class="filter__item-total filter__brand-total"></span>
      </div>
      `;
            filterItem.innerHTML = brandFilter;
            brandsFragment.appendChild(filterItem);
        });
        return brandsFragment;
    }
    createItemsFilterCategory() {
        const categoriesFragment: DocumentFragment = document.createDocumentFragment();
        this.categories.forEach((category: string) => {
            const filterItem = document.createElement('label');
            filterItem.classList.add('filter__item', 'filter__item-category');
            const categoryFilter = `
      <input type="checkbox" class="category-mark" data-category="${category}">
      <span class="filter__item-title filter__category-title">
          ${category}
      </span>
      <div class="filter__item-amount filter__category-amount">
        <span class="filter__item-current-total filter__category-current-total"></span>
        <span class="filter__item-total filter__category-total"></span>
      </div>
      `;
            filterItem.innerHTML = categoryFilter;
            categoriesFragment.appendChild(filterItem);
        });
        return categoriesFragment;
    }
    appendItemsFilterCategory() {
        const filtersitemsCategory: Element | null = document.querySelector('.filters__items-category');
        const itemsCategory = this.createItemsFilterCategory();
        if (filtersitemsCategory) {
            filtersitemsCategory.appendChild(itemsCategory);
        }
    }
    appendItemsFilterBrands() {
        const filtersitemsBrands: Element | null = document.querySelector('.filters__brand-brands');
        const itemsBrands = this.createItemsFilterBrands();
        if (filtersitemsBrands) {
            filtersitemsBrands.appendChild(itemsBrands);
        }
    }
}

export { Filters, BrandCard };
