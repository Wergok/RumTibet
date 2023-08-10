import Burger from './components/Burger.min.js';
import CloseButtonBurger from './components/CloseButtonBurger.min.js';
import OpenButtonBurger from './components/OpenButtonBurger.min.js';

const clBurger = new Burger(".burger");
const clCloseButtonBurger = new CloseButtonBurger(".burger__close-button", clBurger);
const clOpenButtonBurger = new OpenButtonBurger(".header__burger-open", clBurger);

clCloseButtonBurger.init();
clOpenButtonBurger.init();