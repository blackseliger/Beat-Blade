

export default class BeatBlade {
    subElements = {};
    start;


    onStart = (event) => {

    }

    onStop = (event) => {

    }

    onPick = (event) => {

    }


    constructor(size = 4) {
        this.size = size >= 4 ? size : 4;

        this.render();
    }

    render() {
        const wrapper = document.createElement('div');

        wrapper.innerHTML = this.getTemplate();

        this.element = wrapper.firstElementChild;
        this.subElements = this.getSubElements();

        this.initEventListeners();
    }

    // initEventListeners() {
        // start - stop buttons / pick когда успешно попал на goblin img
    // }

    startGame() {
        this.start = setInterval(() => {
            const random = this.getRandomIntInclusive(this.size);
            this.subElements[random].append(this.subElements.goblin);
        }, 1000)
    }

    stopGame() {
        return typeof this.start === 'function' ? clearInterval(this.start) : null;
    }



    getRandomIntInclusive(max) {
        min = Math.ceil(0);
        max = Math.floor(max - 1);
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }

    getSubElements() {
        const elements = this.element.querySelectorAll('[data-element]');

        for (const item of elements) {
            this.subElements[item.dataset.element] = item;
        }

        return this.subElements;
    }
    

    getTable() {
        const sizeArr = new Array(this.size);
        return `<div class="beadBlade" style="width: ${(this.size * 150)}">
        <div class="beadBlade__img beadBlade__img-hidden" data-element="goblin">
        <img src="goblin.png" alt="goblin" class="beadBlade__goblin">
    </div>
        <div class="beadBlade__cells">
        ${sizeArr.forEach((_cell, index) => {
            return `<div class="beadBlade__cell" data-element="${index}"></div>`
        }).join('')}
        </div>
    </div>`
    }


}