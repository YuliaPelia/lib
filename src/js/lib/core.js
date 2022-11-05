// // Створення глобальної функції яка буде викликатись тільки по одному символу ($)

// при використанні $ і передавання в нього селектора, кожного разу буде створюватися новий об'єкт 
// і буде запускатися метод (init()) який буде записаний в прототипі цієї ф-ції
const $ = function(selector) {
    return new $.prototype.init(selector);
};

// буде получати елементи з якими ми будемо працювати
$.prototype.init = function(selector) {
    // якщо в нас не був переданий selector тоді
    if(!selector) {
        return this; // повертаємо пустий об'єкт {}
    }

    // створюєм новий обєкт і в нього добавляєм всі ті елементи які получимо з selector
    // assign() - дозволяє в існуючий об'єкт додати нову властивість щоб вони закріпились в цьому об'єкті
    // 1 аргумент - це обєкт в який ми будемо добавляти все це
    // коли ми використовуємо this то буде зберігатися властивість prototype
    Object.assign(this, document.querySelectorAll(selector));
    this.length = document.querySelectorAll(selector).length;
    return this;
};

// в прототип того обєкта який буде повертатися з ф-ції init записуєм прототип нашої головної ф-ції
$.prototype.init.prototype = $.prototype;

window.$ = $;

export default $;