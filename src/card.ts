import dataCards from './bd/products.json';

interface Products {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
}
interface CategoryCards {
    [index: string]: Products[];
}

class Cards {
    createCard({ title, price, discountPercentage, rating, stock, brand, category }: Products) {
        const cardEl = document.createElement('div');
        cardEl.classList.add('card');
        const content = `
   
    <div class="card__inner">
      <div class="card__title">
        ${title}
      </div>
      <div class="card__content">
        <ul class="card__items">
          <li class="card__item">
            <span class="card__item-title">
              Category:
            </span>
            <span class="card__item-text">
              ${category}
            </span>
          </li>
          <li class="card__item">
            <span class="card__item-title">
              Brand:
            </span>
            <span class="card__item-text">
              ${brand}
            </span>
          </li>
          <li class="card__item">
            <span class="card__item-title">
              Price:
            </span>
            <span class="card__item-text">
                ${price}
            </span>
          </li>
          <li class="card__item">
            <span class="card__item-title">
              Discount:
            </span>
            <span class="card__item-text">
              ${discountPercentage}
            </span>
          </li>
          <li class="card__item">
            <span class="card__item-title">
              Rating:
            </span>
            <span class="card__item-text">
              ${rating}
            </span>
          </li>
          <li class="card__item">
            <span class="card__item-title">
              Stock:
            </span>
            <span class="card__item-text">
              ${stock}
            </span>
          </li>
        </ul>
      </div>
    </div>
    `;
        cardEl.innerHTML = content;
        return cardEl;
    }
    createBoxCards() {
        const cardsWrap = document.createElement('div');
        cardsWrap.classList.add('cards-wrap');

        return cardsWrap;
    }
    deleteCards(storeMainProducts: Element | null) {
        if (storeMainProducts) storeMainProducts.innerHTML = '';
    }
    appendCards(cardsFragment: DocumentFragment) {
        const storeMainProducts: Element | null = document.querySelector('.store-main__products');
        this.deleteCards(storeMainProducts);
        const cardsBox: Element = this.createBoxCards();
        cardsBox.append(cardsFragment);
        if (storeMainProducts) storeMainProducts.appendChild(cardsBox);
    }
    getCards(amountCards = 20) {
        if ('products' in dataCards) {
            const cards: Products[] = dataCards.products;
            const cardsFragment: DocumentFragment = document.createDocumentFragment();

            for (let i = 0; i < amountCards; i++) {
                cardsFragment.appendChild(this.createCard(cards[i]));
            }

            this.appendCards(cardsFragment);
            return cards.slice(0, amountCards);
        }
    }
    setCards(categoryCards: CategoryCards) {
        const cardsFragment: DocumentFragment = document.createDocumentFragment();
        for (const productsCategories of Object.values(categoryCards)) {
            for (const productCategory of productsCategories) {
                cardsFragment.appendChild(this.createCard(productCategory));
            }
        }

        this.appendCards(cardsFragment);
    }
}

export { Cards, Products, CategoryCards };
