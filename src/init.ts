import { Cards, Products, CategoryCards } from './card';
import { FilterCategories } from './filterCategory';

class Initialization {
    cards;
    filterCategories;
    cardsCategory: CategoryCards;
    constructor() {
        this.cardsCategory = {};
        this.cards = new Cards();
        this.filterCategories = new FilterCategories();
    }
    init() {
        this.cards.getCards();
        this.filterCategories.appendItemsFilterCategory();
        window.addEventListener('click', (e: Event) => {
            this.windowClickHandler(e);
        });
    }

    windowClickHandler(e: Event) {
        const targer = e.target as Element;
        if (!targer) return;
        const category: HTMLInputElement | null = targer.closest('.category-mark');

        this.categoryClickHandler(category);
    }
    categoryClickHandler(category: HTMLInputElement | null) {
        if (category) {
            const categoryText: string | undefined = category.dataset.category;
            if (category.checked) {
                if (categoryText) {
                    const listCardsCategory = this.filterCategories.categoriesCards[categoryText];
                    this.cardsCategory[categoryText] = listCardsCategory;
                    this.cards.setCards(this.cardsCategory);
                }
            } else {
                if (categoryText) {
                    delete this.cardsCategory[categoryText];
                    this.cards.setCards(this.cardsCategory);
                }
                if (Object.keys(this.cardsCategory).length === 0) {
                    this.cards.getCards();
                }
            }
        }
    }
}

export default Initialization;
