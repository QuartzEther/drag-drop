const draggbles = document.querySelectorAll(".drag-item")
const containers = document.querySelectorAll(".drag-list")

const block = document.querySelector('body');

draggbles.forEach((draggble) => {
    //for start dragging costing opacity
    draggble.addEventListener("dragstart", () => {
        draggble.classList.add("dragging")
    })

    //for end the dragging opacity costing
    draggble.addEventListener("dragend", () => {
        draggble.classList.remove("dragging")
    })
})

let isAnimate = false;

containers.forEach((container) => {
    container.addEventListener("dragover", function (e) {
        e.preventDefault()
        const afterElement = dragAfterElement(container, e.clientY)
        const dragging = document.querySelector(".dragging")

        let lastElem = null

        // if (afterElement == null && container.lastChild != dragging && !lastElem) {
        //
        //     lastElem = container.lastElementChild;
        //     container.appendChild(dragging)
        //
        //     lastElem.classList.add('animation-up')
        //     lastElem.addEventListener("animationend", () =>{
        //         lastElem.classList.remove('animation-up')
        //     }, false);
        //
        // } else
        if (afterElement && dragging.nextElementSibling != afterElement && !isAnimate) {

            let prevElem = dragging.previousElementSibling;
            let nextElem = dragging.nextElementSibling;

            container.insertBefore(dragging, afterElement);

            //вверх
            if (prevElem === afterElement
                && !prevElem.classList.contains('animation-up')
                && !prevElem.classList.contains('animation-down')) {

                isAnimate = true;

                prevElem.classList.add('animation-down')
                console.log(`${prevElem.innerHTML} add animation-down`)

                prevElem.addEventListener("animationend", () =>{
                    prevElem.classList.remove('animation-down')
                    isAnimate = false;
                    //if (dragging.nextElementSibling != prevElem) console.log('пробег');
                }, false);

            }
            //вниз
            else if (nextElem
                && !nextElem.classList.contains('animation-down')
                && !nextElem.classList.contains('animation-up')){

                isAnimate = true;

                nextElem.classList.add('animation-up')
                console.log(`${nextElem.innerHTML} add animation-up`)

                nextElem.addEventListener("animationend", () =>{
                    nextElem.classList.remove('animation-up')
                    isAnimate = false;
                }, false);

            }
        }



        // if (container.classList.contains('block_complete')){
        //     dragging.classList.replace('item_todo', 'item_complete')
        //     dragging.querySelector('.checkbox > input').checked = true;

        //     let text = dragging.querySelector('.text').innerHTML
        //     if(!text.includes('strike')){
        //         dragging.querySelector('.text').innerHTML = `<strike>${dragging.querySelector('.text').innerHTML}</strike>`
        //     }
        // }else {
        //     dragging.classList.replace('item_complete','item_todo')
        //     dragging.querySelector('.checkbox > input').checked = false;

        //     let text = dragging.querySelector('.text').innerHTML;
        //     if(text.includes('strike')){
        //         dragging.querySelector('.text').innerHTML = dragging.querySelector('.text > strike').innerHTML;
        //     }
        // }
    })
})

function dragAfterElement(container, y) {
    const draggbleElements = [...container.querySelectorAll(".drag-item:not(.dragging)")]

    return draggbleElements.reduce(
        (closest, child) => {
            const box = child.getBoundingClientRect()
            const offset = y - box.top - box.height / 2
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child }
            } else {
                return closest
            }
        },
        { offset: Number.NEGATIVE_INFINITY }
    ).element
}