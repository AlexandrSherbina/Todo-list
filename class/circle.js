export default class Circle {
    #r;
    
    constructor(x, y, r) {
      this.#r = r;
       this.x = x;
       this.y = y;
    }

    circleArea() {
        return Math.PI * Math.pow(this.#r, 2)
    }



}

