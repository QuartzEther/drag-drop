const items = document.querySelectorAll(".drag-item")
const containers = document.querySelectorAll(".drag-list")

for (let item of items){
    let margin =  item.getBoundingClientRect().y; //закрепление позиции item сверху
    item.onmousedown = function(event) { //отследить нажатие

        item.style.position = 'relative';
        //item.style.zIndex = 1000;

        moveAt(event.pageY);

        // передвинуть элемент под координаты курсора
        function moveAt(pageY) {
            item.style.top = pageY - margin - item.offsetHeight / 2 + 'px';
        }

        function onMouseMove(event) {
            moveAt(event.pageY);
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