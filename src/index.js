function changeInnerHTML(elId) {
    document.getElementById(elId).textContent = "Pressed Text";
}

function createElement(type, id, content, events = {}) {
    const el = document.createElement(type)
    el.id = id
    el.textContent = content

    for (const [fn, handle] of Object.entries(events)) {
        el.addEventListener(fn, handle)
    }

    document.body.appendChild(el)
    return el
}

var $button = createElement("button", "btn", "Init Text", {
    click: () => {
        changeInnerHTML("btn")
    }
})

