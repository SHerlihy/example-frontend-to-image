import { JSDOM } from 'jsdom';

const globalJSDOM = new JSDOM(undefined, {
    runScripts: "dangerously",
    pretendToBeVisual: true,
    resources: "usable",
    includeNodeLocations: true
});

const windowJSDOM = globalJSDOM.window

Object.defineProperty(globalThis, "window", {
    value: windowJSDOM,
});

export {
    globalJSDOM
}
