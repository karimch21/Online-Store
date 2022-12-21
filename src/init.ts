import { Cards, Products } from './card';
import { FilterCategories } from './filterCategory';

interface CardsCategory {
    [index: number]: Products;
}

class Initialization {
    cards;
    filterCategories;
    cardsCategory: Products[];
    constructor() {
        this.cards = new Cards();
        this.filterCategories = new FilterCategories();
        this.cardsCategory = [];
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
        const category: HTMLElement | null = targer.closest('.category-mark');

        this.categoryClickHandler(category);
    }
    categoryClickHandler(category: HTMLElement | null) {
        if (category) {
            const categoryText: string | undefined = category.dataset.category;

            if (categoryText) {
                const f = this.filterCategories.categoriesCards[categoryText];
                for (const el of f) {
                    this.cardsCategory.push(el);
                }

                this.cards.setCards(this.cardsCategory);
            }
        }
    }
}

export default Initialization;
