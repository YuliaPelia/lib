import $ from '../core';

// dur - швидкість виконання анімації
// cb - ф-ція яка буде запускатись після запуску анімації
// fin - callback який виконається після закінчення анімації
$.prototype.animateOverTime = function(dur, cb, fin) {
    // створ ф-цію яка буде запускатись до певної умови, тобто якщо умова не виконалась тоді анімація зупиняється
    // вичисляємо час початку анімації і постійно його зрівнюємо
    // з тим часом що ми передали як аргумент (тривалість анімації)
    let timeStart; // коли анімація тільки запускається

    function _animateOverTime (time) {
        if(!timeStart) {
            timeStart = time; 
        }

        // створ змінну що відслідковує виконання анімації
        // беремо час що змінюється віднімаємо час початку анімації
        // для того щоб відслідковувати прогрес
        let timeElapsed = time - timeStart;
        // вичисляємо зміни opacity починаючи з 0,01 і закінчуючи 1 і як тільки це значення перейде за 1, 
        // тоді буде підставлятися 1
        let complection = Math.min(timeElapsed / dur, 1);

        cb(complection);

        if (timeElapsed < dur) {
            requestAnimationFrame(_animateOverTime);
        } else {
            if(typeof fin === 'function') {
                fin();
            }
        }

    }

    return _animateOverTime;
};

// dur - швидкість виконання анімації
$.prototype.fadeIn = function(dur, display, fin) {
    for(let i = 0; i < this.length; i++) {
        this[i].style.display = display || 'block';

        const _fadeIn = (complection) => {
            this[i].style.opacity = complection;
        };

        const ani = this.animateOverTime(dur, _fadeIn, fin);
        requestAnimationFrame(ani);
    }

    return this;
};

$.prototype.fadeOut = function(dur, fin) {
    for(let i = 0; i < this.length; i++) {

        const _fadeOut = (complection) => {
            this[i].style.opacity = 1 - complection;
            if (complection === 1) {
                this[i].style.display = 'none';
            }

        };

        const ani = this.animateOverTime(dur, _fadeOut, fin);
        requestAnimationFrame(ani);
    }

    return this;
};