const items = document.querySelectorAll(".drag-item__txt")
const containers = document.querySelectorAll(".drag-list")

const container = document.querySelector(".drag-list")

for (let item of items){
    let margin =  item.getBoundingClientRect().y; //закрепление позиции item сверху
    item.onmousedown = function(event) { //отследить нажатие

        item.style.position = 'relative';
        item.style.zIndex = 1000;

        moveAt(event.pageY);

        // передвинуть элемент под координаты курсора
        function moveAt(pageY) {
            item.style.top = pageY - margin - item.offsetHeight / 2 + 'px';
        }

        function onMouseMove(event) {
            moveAt(event.pageY);

            let thisEl = item.parentElement;

            let prevEl = thisEl.previousElementSibling;
            let nextEl = thisEl.nextElementSibling;

            //перемещение item

            //перемещение вниз
            if (nextEl && item.getBoundingClientRect().y > nextEl.children[0].getBoundingClientRect().y){
                container.insertBefore(nextEl, thisEl);
                item.style.top = 0;
                margin = item.getBoundingClientRect().y;
            } else if (prevEl && item.getBoundingClientRect().y < prevEl.children[0].getBoundingClientRect().y){
                container.insertBefore(thisEl, prevEl);
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
        };

        //зануление обычного d&d
        item.ondragstart = function() {
            return false;
        };
    };
}
