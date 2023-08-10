export default class OpenButtonBurger {
   constructor(elementSelector, burger) {
      this.button = document.querySelector(elementSelector);
      this.burger = burger;
   }

   lockBody() {
      if (document.body.classList.contains("body-lock")) return;
      document.body.classList.add("body-lock");
   }

   init() {
      this.button.addEventListener("click", () => {
         this.lockBody();
         this.burger.open();
      });
   }
}