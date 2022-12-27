import { Cards, Products } from './card';
import cards from './bd/products.json';

type BrandCard = { [index: string]: Products[] };

interface CategoryCards {
  [index: string]: Products[];
}
class FilterBrandCard {
  branCards: BrandCard;
  brands: string[];
  constructor() {
    this.branCards = this.getBrandsCards()
    this.brands = Object.keys(this.branCards);
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
  appendItemsFilterBrands() {
    const filtersitemsBrands: Element | null = document.querySelector('.filters__brand-brands');
    const itemsBrands = this.createItemsFilterBrands();
    if (filtersitemsBrands) {
      filtersitemsBrands.appendChild(itemsBrands);
    }
  }
  filteringCardsCategory(d: CategoryCards) {
    console.log(1)
    console.log(d)
    console.log(1)
  }
  getBrandsCards() {
    let branCards: CategoryCards = {}
    cards.products.forEach((card: Products) => {
      const brand: string = card.brand;

      if (!branCards[brand]) {
        branCards[brand] = [card];
      } else {
        branCards[brand].push(card);
      }
    });
    return branCards;
  }
}

export {FilterBrandCard, BrandCard}