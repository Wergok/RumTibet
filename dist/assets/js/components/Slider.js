export default class Slider {
   constructor(sliderSelector, breakpoints) {
      this.slider = document.querySelector(sliderSelector);
      this.sliderLine = this.slider.querySelector(".slider__line");
      this.slides = this.slider.querySelectorAll(".slide");
      this.slidesWrapper = this.slider.querySelectorAll(
         ".slider__slide-wrapper"
      );
      this.listinerEnd = this.handleTouchEnd.bind(this);
      this.listinerMove = this.handleTouchMove.bind(this);

      if (breakpoints) {
         for (const breakpoint in breakpoints) {
            if (+breakpoint >= window.innerWidth) {
               console.log(breakpoints[breakpoint]);
               this.peepingRatio = breakpoints[breakpoint].peepingRatio;
            } else {
               this.peepingRatio = 1.2;
            }
         }
      } else {
         this.peepingRatio = 1.2;
      }
      this.paddingSlides = 20;
      this.slideIndex = 0;
      this.posX1 = 0;
      this.posX2 = 0;
      this.posY1 = 0;
      this.posY2 = 0;
      this.posFinal = 0;
      this.posInit = 0;
      this.trfRegExp = /[-0-9.]+(?=px)/;
   }

   countSlideWidth() {
      this.sliderWidth = this.slider.offsetWidth;
      return this.sliderWidth / this.peepingRatio;
   }

   installationWidthSlide() {
      this.slideWidth = this.countSlideWidth();
      this.posThreshold = this.slideWidth * 0.35;
      this.slides.forEach((element, index) => {
         element.style.width = `${this.slideWidth - this.paddingSlides}px`;
         if (index === 0) {
            element.style.margin = `0px ${this.paddingSlides / 2}px 0px 0px`;
            return;
         }
         if (index === this.slides.length - 1) {
            element.style.margin = `0px 0px 0px ${this.paddingSlides / 2}px`;
            return;
         }
         element.style.margin = `0px ${this.paddingSlides / 2}px 0px ${
            this.paddingSlides / 2
         }px`;
      });
   }

   getEvent() {
      return event.type.search("touch") !== -1 ? event.touches[0] : event;
   }

   handleTouchEnd() {
      this.posFinal = this.posInit - this.posX1;
      document.removeEventListener("touchmove", this.listinerMove);
      document.removeEventListener("touchend", this.listinerEnd);
      document.removeEventListener("mousemove", this.listinerMove);
      document.removeEventListener("mouseup", this.listinerEnd);
      if (Math.abs(this.posFinal) > this.posThreshold) {
         if (this.posInit < this.posX1 && this.slideIndex !== 0) {
            this.slideIndex--;
         } else if (
            this.posInit > this.posX1 &&
            this.slideIndex !== this.slides.length - 1
         ) {
            this.slideIndex++;
         }
      }
      if (this.posInit !== this.posX1) {
         this.swipe();
      }
   }

   handleTouchStart() {
      let event = this.getEvent();

      this.posInit = this.posX1 = event.clientX;
      this.posY1 = event.clientY;
      this.sliderLine.style.transition = "";

      document.addEventListener("touchmove", this.listinerMove);
      document.addEventListener("touchend", this.listinerEnd);
      document.addEventListener("mousemove", this.listinerMove);
      document.addEventListener("mouseup", this.listinerEnd);
   }

   handleTouchMove() {
      let event = this.getEvent(),
         transform = this.sliderLine.style.transform.match(this.trfRegExp)[0];
      this.posX2 = this.posX1 - event.clientX;
      this.posY2 = this.posY1 - event.clientY;
      this.posY1 = event.clientY;
      this.posX1 = event.clientX;
      if (Math.abs(this.posY2) < 7 || this.posX2 === 0) {
         this.sliderLine.style.transform = `translate3d(${
            transform - this.posX2
         }px, 0px, 0px)`;
      }
   }

   swipe() {
      this.sliderLine.style.transition = "transform .5s";
      this.sliderLine.style.transform = `translate3d(-${
         this.slideIndex * this.slideWidth
      }px, 0px, 0px)`;
      console.log(this.slideWidth);
   }

   init() {
      this.installationWidthSlide();
      window.addEventListener("resize", () => {
         this.installationWidthSlide();
      });
      this.sliderLine.style.transform = "translate3d(0px, 0px, 0px)";
      this.slider.addEventListener("touchstart", () => this.handleTouchStart());
      this.slider.addEventListener("mousedown", () => this.handleTouchStart());
   }
}