import $ from '../core';

$.prototype.html = function(content) {
    for (let i = 0; i < this.length; i++) {
        if(content) {
            this[i].innerHTML = content;
        } else {
            return this[i].innerHTML;
        }
    }

    return this;
};

// получення певного елемента по номеру
$.prototype.eq = function(i) {
    const swap = this[i];
    const objLength = Object.keys(this).length; // к-сть властивостей які будуть в нашому об'єкті

    for(let i = 0; i < objLength; i++) {
        // очищаєм цей обєкт
        delete this[i];
    }

    this[0] = swap;
    this.length = 1;
    return this;
};


$.prototype.index = function() {
    const parent = this[0].parentNode;
    const childs = [...parent.children];

    const findMyIndex = (item) => {
        return item == this[0];
    };

    return childs.findIndex(findMyIndex);
};

// формування нового обєкта
$.prototype.find = function(selector) {
    let numberOfItems = 0; // загальна к-сть яка получилась
    let counter = 0; // к-сть нових записаних елементів в this

    const copyObj = Object.assign({}, this);

    for(let i = 0; i < copyObj.length; i++) {
        const arr = copyObj[i].querySelectorAll(selector);

        if(arr.length == 0) {
            continue;
        }

        for(let g = 0; g < arr.length; g++) {
            this[counter] = arr[g];
            counter++;
        }

        numberOfItems += arr.length;
    }
    this.length = numberOfItems;

    const objLength = Object.keys(this).length; // к-сть властивостей які будуть в нашому об'єкті
    for(; numberOfItems < objLength; numberOfItems++) {
        delete this[numberOfItems];
    }

    return this;
};

$.prototype.closest = function(selector) {
    let counter = 0;

    for(let i = 0; i < this.length; i++) {
        this[i] = this[i].closest(selector);
        counter++;
    }

    const objLength = Object.keys(this).length; // к-сть властивостей які будуть в нашому об'єкті
    for(; counter < objLength; counter++) {
        delete this[counter];
    }

    return this;
};

// створ метод який получає всі сусідні елементи не включаючи сам елемент
$.prototype.siblings = function() {
    let numberOfItems = 0; // загальна к-сть яка получилась
    let counter = 0; // к-сть нових записаних елементів в this

    const copyObj = Object.assign({}, this); // копія головного об'єкта, щоб уникнути багів

    for(let i = 0; i < copyObj.length; i++) {
        const arr = copyObj[i].parentNode.children;

        for(let g = 0; g < arr.length; g++) {
            if(copyObj[i] === arr[g]) {
                continue;
            }

            this[counter] = arr[g]; // всі сусіди які є в цьго блоку
            counter++;
        }

        numberOfItems += arr.length - 1;
    }
    
    this.length = numberOfItems;

    const objLength = Object.keys(this).length; // к-сть властивостей які будуть в нашому об'єкті
    for(; numberOfItems < objLength; numberOfItems++) {
        delete this[numberOfItems];
    }

    return this;
};