import { useTypedSelector } from "./use-typed-selector";

export const useCumulativeCode = (cellId: string) => {
    const { order, data } = useTypedSelector((state) => state.cells);

    const orderedCells = order.map((id) => data[id]);

    const showFunc = `
        import _React from "react";
        import {createRoot} from "react-dom/client";
        var show = (value) => {
            const root = document.querySelector("#root");

            if (typeof value === 'object') {
                if (value.$$typeof && value.props) {
                    createRoot(root).render(value);
                } else {
                    root.innerHTML = JSON.stringify(value);
                }
            } else {
                root.innerHTML = value;
            }
        }
    `;
    const showFuncNoop = `var show = () => {};`;
    const cumulativeCode = [];
    for (let c of orderedCells) {
        if (c.type === "code") {
            if (c.id === cellId) {
                cumulativeCode.push(showFunc);
            } else {
                cumulativeCode.push(showFuncNoop);
            }
            cumulativeCode.push(c.content);
        }
        if (c.id === cellId) {
            break;
        }
    }
    return cumulativeCode.join("\n");
};

// Give the following console warning
// Selector unknown returned a different result when called with the same parameters. This can lead to unnecessary rerenders.
// Selectors that return a new reference (such as an object or an array) should be memoized:

// export const useCumulativeCode = (cellId: string) => {
//     return useTypedSelector((state) => {
//         const { data, order } = state.cells;
//         const orderedCells = order.map((id) => data[id]);

//         const showFunc = `
//             import _React from "react";
//             import {createRoot} from "react-dom/client";
//             var show = (value) => {
//                 const root = document.querySelector("#root");

//                 if (typeof value === 'object') {
//                     if (value.$$typeof && value.props) {
//                         createRoot(root).render(value);
//                     } else {
//                         root.innerHTML = JSON.stringify(value);
//                     }
//                 } else {
//                     root.innerHTML = value;
//                 }
//             }
//         `;
//         const showFuncNoop = `var show = () => {};`;
//         const cumulativeCode = [];
//         for (let c of orderedCells) {
//             if (c.type === "code") {
//                 if (c.id === cellId) {
//                     cumulativeCode.push(showFunc);
//                 } else {
//                     cumulativeCode.push(showFuncNoop);
//                 }
//                 cumulativeCode.push(c.content);
//             }
//             if (c.id === cellId) {
//                 break;
//             }
//         }
//         return cumulativeCode;
//     }).join("\n");
// };
