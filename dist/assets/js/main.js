import Burger from "./components/Burger.min.js";
import CloseButtonBurger from "./components/CloseButtonBurger.min.js";
import OpenButtonBurger from "./components/OpenButtonBurger.min.js";

const clBurger = new Burger(".burger");
const clCloseButtonBurger = new CloseButtonBurger(
   ".burger__close-button",
   clBurger
);
const clOpenButtonBurger = new OpenButtonBurger(
   ".header__burger-open",
   clBurger
);

clCloseButtonBurger.init();
clOpenButtonBurger.init();

document.addEventListener("DOMContentLoaded", () => {
   const priceCardVisibleList = document.querySelectorAll(".PriceCardVisible");
   const priceCardBottomList = document.querySelectorAll(".price__card-bottom");
   const priceCardList = document.querySelectorAll(".price__card");

   const hoverPriceCard = (priceCardVisible, priceCardBottom, cardPrice) => {
      const priceCardVisibleHeight = priceCardVisible.clientHeight;
      const priceCardbottomHeight = priceCardBottom.clientHeight;
      priceCardBottom.style.top = `${
         priceCardbottomHeight - priceCardVisibleHeight
      }px`;
      cardPrice.addEventListener("mouseout", () => {
         priceCardBottom.style.top = `${
            priceCardbottomHeight - priceCardVisibleHeight
         }px`;
      });
      cardPrice.addEventListener("mouseover", () => {
         priceCardBottom.style.top = `0px`;
      });
   };

   priceCardVisibleList.forEach((element, index) => {
      hoverPriceCard(element, priceCardBottomList[index], priceCardList[index]);
   });
});