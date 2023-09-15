import { JSDOM } from 'jsdom';

const domJSDOM = new JSDOM(undefined, {
    runScripts: "dangerously",
    pretendToBeVisual: true,
    resources: "usable",
    includeNodeLocations: true
});

const windowJSDOM = domJSDOM.window

Object.defineProperty(globalThis, "window", {
    value: windowJSDOM,
});

//Object.defineProperty(globalThis.window, "navigator", {
//    value: windowJSDOM.navigator,
//});

//Object.defineProperty(globalThis.window.navigator, "clipboard", {
//    value: {},
//});

function render(html) {
	const container = windowJSDOM.document.createElement('div');
	container.innerHTML = html;
	const queryByTestId = testId => {
		return container.querySelector(`[data-testid="${testId}"]`);
	};
	windowJSDOM.document.body.appendChild(container);
	return {
		container,
		queryByTestId,
	};
}

export {
    domJSDOM,
    windowJSDOM,
    render
}
