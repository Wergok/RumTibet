import Burger from "./components/Burger.min.js";
import CloseButtonBurger from "./components/CloseButtonBurger.min.js";
import OpenButtonBurger from "./components/OpenButtonBurger.min.js";
import Slider from "./components/Slider.js";

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
   const priceCardBottomList = document.querySelectorAll(".card-price__bottom");
   const priceCardList = document.querySelectorAll(".card-price");

   const hoverPriceCard = (priceCardVisible, priceCardBottom, cardPrice) => {
      const priceCardVisibleHeight = priceCardVisible.clientHeight;
      const priceCardbottomHeight = priceCardBottom.clientHeight;
      if (
         /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
            navigator.userAgent
         )
      ) {
         priceCardBottom.style.top = `0px`;
      } else {
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
      }
   };

   priceCardVisibleList.forEach((element, index) => {
      hoverPriceCard(element, priceCardBottomList[index], priceCardList[index]);
   });

   const SliderPrice = new Slider(".price__slider");
   SliderPrice.init();

   const SliderBlog = new Slider(".blog__slider", {
      600: {
         peepingRatio: 1.1,
      },
   });
   SliderBlog.init();

   const clampList = [];
   clampList.push(
      ...Array.from(document.querySelectorAll(".card-price__description"))
   );
   clampList.push(...Array.from(document.querySelectorAll(".new__text")));
   clampList.forEach((element) => {
      $clamp(element, { clamp: 6 });
   });
});