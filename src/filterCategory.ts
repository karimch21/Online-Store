import cards from './bd/products.json';
import { Cards, Products } from './card';

// interface ListDataCard {
//   products: Products[];
//   total: number;
//   skip: number;
//   limit: number;
// }

type BrandCard = { [index: string]: Products[] };
type CategoriesCards = { [index: string]: Products[] };
interface CategoryCard {
    [index: string]: BrandCard;
}
const listCategoryCards: CategoryCard = {};
class FilterCategories {
    categories: string[];
    convertedCards: CategoryCard;
    branCards: BrandCard;
    categoriesCards: CategoriesCards;
    constructor() {
        this.branCards = {};
        this.categoriesCards = {};
        this.convertedCards = this.convertingCards();
        this.categories = Object.keys(this.convertedCards);
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

    convertingCards() {
        cards.products.forEach((card: Products) => {
            const category: string = card.category;
            const brand: string = card.brand;

            if (!this.branCards[brand]) {
                this.branCards[brand] = [card];
            } else {
                this.branCards[brand].push(card);
            }

            if (!this.categoriesCards[category]) {
                this.categoriesCards[category] = [card];
            } else {
                this.categoriesCards[category].push(card);
            }

            if (!listCategoryCards[category]) {
                listCategoryCards[category] = {
                    [brand]: [card],
                };
            } else {
                if (!listCategoryCards[category][brand]) {
                    listCategoryCards[category][brand] = [card];
                } else {
                    listCategoryCards[category][brand].push(card);
                }
            }
        });

        return listCategoryCards;
    }
}

export { FilterCategories };
