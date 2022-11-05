import $ from '../core';
// для показу елементів на сторінці
$.prototype.show = function() {
    for(let i = 0; i < this.length; i++) {
        if(!this[i].style) {
            continue;
        }
        this[i].style.display = '';
    }

    return this;
};

// для приховування елементів на сторінці
$.prototype.hide = function() {
    for(let i = 0; i < this.length; i++) {
        if(!this[i].style) {
            continue;
        }
        this[i].style.display = 'none';
    }

    return this;
};

// якщо елемент прихований ми його будемо показувати, а якщо елемент показаний ми його будемо скривати
$.prototype.toggle = function() {
    for(let i = 0; i < this.length; i++) {
        if(!this[i].style) {
            continue;
        }

        if(this[i].style.display === 'none') {
            this[i].style.display = '';
        } else {
            this[i].style.display = 'none';
        }
    }

    return this;
};
