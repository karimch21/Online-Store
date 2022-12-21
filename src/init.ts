import { Cards, Products } from './card';
import { FilterCategories } from './filterCategory';



class Initialization {
  cards;
  filterCategories;
  cardsCategory: Array<Products[]>;
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
    const category: HTMLInputElement | null = targer.closest('.category-mark');

    this.categoryClickHandler(category);
  }
  categoryClickHandler(category: HTMLInputElement | null) {

    if (category) {
      if (category.checked) {
       
        const categoryText: string | undefined = category.dataset.category;

        if (categoryText) {
          const productsCategories = this.filterCategories.categoriesCards[categoryText];
          this.cardsCategory.push(productsCategories);
          console.log(this.cardsCategory)

          this.cards.setCards(this.cardsCategory);
        }
      }
      else {
        this.cardsCategory.pop();
        if(this.cardsCategory.length === 0){
          this.cards.getCards();
        }
        else{
          this.cards.setCards(this.cardsCategory);
        }
      }
    }
  }
}

export default Initialization;
