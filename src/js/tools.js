function delegateEvent(selector, fn) {
    return function (e) {
        if (e.target.closest(selector)) {
            fn(e);
        }
    }
}

export {
    delegateEvent,
}
