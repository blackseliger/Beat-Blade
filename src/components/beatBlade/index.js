

export default class BeatBlade {
    subElements = {};
    start;
    score = 0;


    onStart = (event) => {
        event.preventDefault();
        this.startGame();
    }

    onStop = (event) => {
        event.preventDefault();
        this.stopGame();
    }

    onPick = (event) => {
        const element = event.target;
        if (element.closest('beadBlade__goblin')) {
            this.score += 1;

            const random = this.getRandomIntInclusive(this.size);
            this.subElements[random].append(this.subElements.goblin);

        } else {
            this.fail += 1;
            if (this.fail >= 5) this.stopGame();
        }
    }


    constructor(size = 4) {
        this.size = size >= 4 ? size : 4;
        this.score = 0;
        this.fail = 0;
        this.render();
    }

    render() {
        const wrapper = document.createElement('div');

        wrapper.innerHTML = this.getTemplate();

        this.element = wrapper.firstElementChild;
        this.subElements = this.getSubElements();

        this.initEventListeners();
    }

    initEventListeners() {
        const { startGame, stopGame, cells} = this.subElements;
        
        startGame.addEventListeners('submit', this.onStart);
        stopGame.addEventListeners('submit', this.onStop);
        cells.addEventListeners('click', this.onPick);
    }

    startGame() {
        this.subElements[goblin].classList.remove('.beadBlade__img-hidden');

        this.start = setInterval(() => {
            const random = this.getRandomIntInclusive(this.size);
            this.subElements[random].append(this.subElements.goblin);
        }, 1000)
    }

    stopGame() {
        this.subElements[goblin].classList.add('.beadBlade__img-hidden');
        clearInterval(this.start)
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
        <div class="beadBlade__cells" data-element="cells">
        ${sizeArr.forEach((_cell, index) => {
            return `<div class="beadBlade__cell" data-element="${index}"></div>`
        }).join('')}
        </div>
    </div>`
    }


    remove() {
        if (this.element) {
            this.element.remove();
        }
    }

    destroy() {
        this.remove();
        this.element = null;
        this.subElements = null;
    }


}