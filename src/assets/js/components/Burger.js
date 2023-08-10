export default class Burger {
   constructor(elementSelector) {
      this.burger = document.querySelector(elementSelector);
   }

   open() {
      if (this.burger.classList.contains("burger--active")) return;
      this.burger.classList.add("burger--active");
   }

   close() {
      if (this.burger.classList.contains("burger--active")) {
         this.burger.classList.remove("burger--active");
      }
   }
}
