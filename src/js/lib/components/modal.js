import $ from '../core';



$.prototype.modal = function(created) {
    const scroll = calcScroll();
          

    for(let i = 0; i < this.length; i++) {
        const target = this[i].getAttribute('data-target');
        $(this[i]).click((e) => {
            e.preventDefault();
            $(target).fadeIn(500);
            $(target).style.display = 'block';
            document.body.style.overflow = 'hidden';
            document.body.style.marginRight = `${scroll}px`;
        });

        const closeElements = document.querySelectorAll(`${target} [data-close]`);
        closeElements.forEach(elem => {
            $(elem).click(() => {
                $(target).fadeOut(500);
                document.body.style.overflow = '';
                document.body.style.marginRight = `0px`;
                if(created) {
                    document.querySelector(target).remove();
                }
            });
        });
    
        $(target).click(e => {
            if(e.target.classList.contains('modal')) {
                $(target).fadeOut(500);
                document.body.style.overflow = '';
                document.body.style.marginRight = `0px`;
                if(created) {
                    document.querySelector(target).remove();
                }
            }
        });
    }



    function calcScroll() {
        let div = document.createElement('div');
    
        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflowY = 'scroll';
        div.style.visibility = 'hidden';
    
        document.body.appendChild(div);
        let scrollWidth = div.offsetWidth - div.clientWidth;
        div.remove();
    
        return scrollWidth;
    }
};



$('[data-toggle="modal"]').modal();
// для того щоб генерувати модальне вікно яке чітко прив'язане до певного тріггера (кнопки)
$.prototype.createModal = function({text, btns} = {}) {
    for(let i = 0; i < this.length; i++) {
        let modal = document.createElement('div');
        modal.classList.add('modal');
        modal.setAttribute('id', this[i].getAttribute('data-target').slice(1));


        const buttons = [];
        for(let h = 0; h < btns.count; h++) {
            let btn = document.createElement('button');
            btn.classList.add('btn', ...btns.settings[h][1]);
            btn.textContent = btns.settings[h][0];
            if(btns.settings[h][2]) {
                btn.setAttribute('data-close', 'true');
            }
            if(btns.settings[h][3] && typeof(btns.settings[h][3] === 'function')) {
                btn.addEventListener('click', btns.settings[h][3]);
            }

            buttons.push(btn);
        }

        modal.innerHTML = `
        <div class="modal-dialog">
            <div class="modal-content">
                <button class="close" data-close>
                    <span>&times;</span>
                </button>
                <div class="modal-header">
                    <div class="modal-title">
                        ${text.title}
                    </div>
                </div>
                <div class="modal-body">
                    ${text.body}
                </div>
                <div class="modal-footer">

                </div>  
            </div>
        </div>
        `;

        modal.querySelector(".modal-footer").append(...buttons);
        document.body.appendChild(modal);
        $(this[i]).modal(true);
        $(this[i].getAttribute('data-target')).fadeIn(500);
    }

};