const items = document.querySelectorAll(".drag-item")
const containers = document.querySelectorAll(".drag-list")

const container = document.querySelector(".drag-list")

for (let item of items){
    let margin =  item.getBoundingClientRect().y; //закрепление позиции item сверху
    item.onmousedown = function(event) { //отследить нажатие

        margin =  item.getBoundingClientRect().y; //закрепление позиции item сверху
        item.style.transition = 'none'


        item.style.position = 'relative';
        item.style.zIndex = 1000;

        moveAt(event.pageY);

        // передвинуть элемент под координаты курсора
        function moveAt(pageY) {
            item.style.top = pageY - margin - item.offsetHeight / 2 + 'px';
        }

        function onMouseMove(event) {
            moveAt(event.pageY);

            let thisEl = item;

            let prevEl = thisEl.previousElementSibling;
            let nextEl = thisEl.nextElementSibling;

            //перемещение item

            //перемещение вниз
            if (nextEl && item.getBoundingClientRect().y > nextEl.getBoundingClientRect().y){
                container.insertBefore(nextEl, thisEl);

                nextEl.classList.add('animation-up');
                nextEl.addEventListener("animationend", () =>{
                    nextEl.classList.remove('animation-up')
                }, false);

                item.style.top = 0;
                margin = item.getBoundingClientRect().y;


            } else if (prevEl && item.getBoundingClientRect().y < prevEl.getBoundingClientRect().y){
                container.insertBefore(thisEl, prevEl);

                prevEl.classList.add('animation-down')
                prevEl.addEventListener("animationend", () =>{
                    prevEl.classList.remove('animation-down')
                }, false);

                item.style.top = 0;
                margin = item.getBoundingClientRect().y;


            }
        }

        // перемещать по экрану
        document.addEventListener('mousemove', onMouseMove);

        //положить элемент, удалить более ненужные обработчики событий
        document.onmouseup = function() {
            document.removeEventListener('mousemove', onMouseMove);
            item.onmouseup = null;
            item.style.transition = 'all .3s ease'
            item.style.top = 0;
        };

        //зануление обычного d&d
        item.ondragstart = function() {
            return false;
        };
    };
}
