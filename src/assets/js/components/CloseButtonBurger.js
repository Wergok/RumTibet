export default class CloseButtonBurger {
   constructor(elementSelector, burger) {
      this.button = document.querySelector(elementSelector);
      this.burger = burger;
   }

   unLockBody() {
      if (document.body.classList.contains("body-lock")) {
         document.body.classList.remove("body-lock");
      }
   }

   init() {
      this.button.addEventListener("click", () => {
         this.unLockBody();
         this.burger.close();
      });
   }
}
