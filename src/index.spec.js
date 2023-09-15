import { Script } from "vm";
import {readFile} from 'fs/promises';
import {
    domJSDOM,
    windowJSDOM,
} from '../spec/helpers/renderer.js';
import {fireEvent, getAllByRole, findByText, waitFor, getByRole} from '@testing-library/dom'

import userEvent from '@testing-library/user-event'

function traverse(target) {
  for (const key in target) {
    if (key !== 'e' && typeof target[key] === 'object') {
      traverse(target[key]);
    } else {
      console.log(key, target[key]);
    }
  }
}

async function content(path) {  
  return await readFile(path, 'utf8')
}

const scriptTxt = await content('./src/test.js')

describe("A suite", function() {
    const script = new Script(scriptTxt)

    const vmContext = domJSDOM.getInternalVMContext();

    script.runInContext(vmContext);

    const user = userEvent.setup({
        document: windowJSDOM.document,
    })

    it("sanity", async function() {
        expect(getAllByRole(windowJSDOM.document, 'button').length).toBe(1)
        console.log(windowJSDOM.document.body.innerHTML)

        const btnEl = getByRole(windowJSDOM.document, 'button')

        await user.click(btnEl)

        //fireEvent(
        //    btnEl,
        //    new windowJSDOM.MouseEvent('click', {
        //        bubbles: true,
        //        cancelable: true,
        //    })
        //)

        await waitFor(
            ()=>expect(getAllByRole(windowJSDOM.document, 'button').length).toBe(2),
            {
                container: windowJSDOM.document
            }
        )
        console.log(windowJSDOM.document.body.innerHTML)
    })

   // it("runs injected script", async function() {
   //     const el = windowJSDOM.document.createElement('button');
   //     el.innerText = "btn two"

   //     windowJSDOM.eval(`document.body.appendChild(${el})`)

   //     await findByText(container, "btn two")

   //     await waitFor(
   //         ()=>expect(getAllByRole(container, 'button').length).toBe(2)
   //     )

   //     console.log(container.innerHTML)
   // })

   // it("contains spec with an expectation", async function() {
   //     const btnEl = screen.getByRole("button") 
   //     expect(screen.getAllByRole('button').length).toBe(1)
   //     expect(btnEl).toHaveTextContent("btnUnpressed")
   //     await user.click(btnEl)
   //     expect(screen.getAllByRole('button').length).toBe(2)
   //     expect(btnEl).toHaveTextContent("btnPressed")
   //    // const btnEl =screen.getByRole('button') 
   //    // console.log(btnEl.innerHTML)

   //    // traverse(expect())

   //    // expect(btnEl).toBeArray()
   // })
});
