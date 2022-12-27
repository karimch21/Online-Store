import cards from './bd/products.json';
import { Cards, Products } from './card';


type BrandCard = { [index: string]: Products[] };
type CategoriesCards = { [index: string]: Products[] };
interface CategoryCard {
    [index: string]: BrandCard;
}

class FilterCategories {
    categories: string[];
    categoryCards: CategoriesCards;

    constructor() {
        this.categoryCards = this.getCategoriesCards();
        this.categories = Object.keys(this.categoryCards);
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

    getCategoriesCards() {
        let categoriesCards:CategoriesCards = {};
        cards.products.forEach((card: Products) => {
            const category: string = card.category;

            if (!categoriesCards[category]) {
                categoriesCards[category] = [card];
            } else {
                categoriesCards[category].push(card);
            }
        });

        return categoriesCards;
    }
}

export { FilterCategories };
