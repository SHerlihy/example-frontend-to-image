import { Script } from "vm";
import {readFile} from 'fs/promises';
import {
    domJSDOM,
    windowJSDOM,
} from '../spec/helpers/renderer.js';
import {
    getByText,
    queryByText,
    waitFor
} from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

async function content(path) {  
  return await readFile(path, 'utf8')
}

const indexTxt = await content('./src/index.js')

describe("text button", function() {
    const script = new Script(indexTxt)

    const vmContext = domJSDOM.getInternalVMContext();

    script.runInContext(vmContext)

    const user = userEvent.setup({
        document: windowJSDOM.document,
    })

    it("changes text when clicked", async function() {
        const pressedEl = queryByText(windowJSDOM.document, 'pressed btn txt')
        expect(pressedEl).toBe(null)

        const btnEl = getByText(windowJSDOM.document, 'init btn txt')

        await user.click(btnEl)

        const tryPressedEl = () => {
            const qryPressed = queryByText(windowJSDOM.document, 'pressed btn text');


            expect(qryPressed).not.toBe(null)

            if (qryPressed !== null) {
                expect(qryPressed).toBeValid()
            }
        }

         await waitFor(tryPressedEl, {container: windowJSDOM.document})
    })
})
