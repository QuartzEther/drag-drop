const containers = document.querySelectorAll(".drag-list")

const items = document.querySelectorAll(".drag-item")

for (let item of items){

    let container = item.parentElement;

    let prevContainer = null;
    let nextContainer = null;

    if (containers.length > 1){
        if (container.nextElementSibling && container.nextElementSibling.classList.contains('drag-list')){
            nextContainer = container.nextElementSibling;
        }
        if (container.previousElementSibling && container.previousElementSibling.classList.contains('drag-list')){
            prevContainer = container.previousElementSibling;
        }
    }

    let margin =  item.getBoundingClientRect().y; //закрепление позиции item сверху

    item.addEventListener('touchstart', touchStart);
    item.addEventListener('mousedown', touchStart)

    function touchStart (event){
        event.preventDefault();

        margin =  item.getBoundingClientRect().y; //закрепление позиции item сверху
        item.style.transition = 'none'

        item.style.position = 'relative';
        item.style.zIndex = 1000;

        if (event.targetTouches){
            let touch = event.targetTouches[0];
            item.style.top = touch.clientY - margin - item.offsetHeight / 2 + 'px';

            document.addEventListener('touchmove', touchMove, {passive: false});
            document.addEventListener('touchend', touchEnd);
        } else {
            item.style.top = event.clientY - margin - item.offsetHeight / 2 + 'px';

            document.addEventListener('mousemove', touchMove);
            document.addEventListener('mouseup', touchEnd);
        }
    }


    function touchMove(event) {
        event.preventDefault();

        let touch = event.targetTouches? event.targetTouches[0]:event;
        item.style.top = touch.clientY - margin - item.offsetHeight / 2 + 'px';

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


        } else if (prevEl && item.getBoundingClientRect().y < prevEl.getBoundingClientRect().y){ //вверх
            container.insertBefore(thisEl, prevEl);

            prevEl.classList.add('animation-down')
            prevEl.addEventListener("animationend", () =>{
                prevEl.classList.remove('animation-down')
            }, false);

            item.style.top = 0;
            margin = item.getBoundingClientRect().y;

        } else if (nextContainer
            && (item.getBoundingClientRect().bottom) > nextContainer.getBoundingClientRect().y){ //в нижний контейнер
            nextContainer.prepend(item);

            prevContainer = container;
            container = nextContainer;
            nextContainer = (container.nextElementSibling && container.nextElementSibling.classList.contains('drag-list')) ?
                container.nextElementSibling : null;

            item.style.top = 0;
            margin = item.getBoundingClientRect().y;
        } else if (prevContainer
            && item.getBoundingClientRect().y < prevContainer.getBoundingClientRect().bottom){ //в верхний контейнер
            prevContainer.appendChild(item);

            nextContainer = container;
            container = prevContainer;
            prevContainer = (container.previousElementSibling && container.previousElementSibling.classList.contains('drag-list')) ?
                container.previousElementSibling : null;

            item.style.top = 0;
            margin = item.getBoundingClientRect().y;
        }
    }

    function touchEnd (){
        document.removeEventListener('touchmove', touchMove);
        document.removeEventListener('mousemove', touchMove);

        item.ontouchend = null;
        item.style.transition = 'all .3s ease'
        item.style.top = 0;
    }

    function onMouseUp() {
        document.removeEventListener('mousemove', touchMove);
        item.onmouseup = null;
        item.style.transition = 'all .3s ease'
        item.style.top = 0;
    };
}
