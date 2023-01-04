import './global.css';
import './styles.css';
import Initialization from './init';
import SortingPriceStock from './sortPriceStock';

const initialization = new Initialization();
initialization.init();

// (new SortingPriceStock()).initPriceStockSLliders()
let a = new SortingPriceStock()
a.sorting()
a.initPriceStockSLliders()