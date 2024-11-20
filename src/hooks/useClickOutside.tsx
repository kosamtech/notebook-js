import { Dispatch, MutableRefObject, SetStateAction, useEffect } from "react";

const useClickOutside = (
    ref: MutableRefObject<HTMLDivElement | null>,
    setEdit: Dispatch<SetStateAction<boolean>>,
) => {
    useEffect(() => {
        const listener = (eventt: globalThis.MouseEvent) => {
            if (
                ref.current &&
                eventt.target &&
                ref.current.contains(eventt.target as Node)
            ) {
                return;
            }
            setEdit(false);
        };
        document.addEventListener("click", listener, { capture: true });

        return () => {
            document.removeEventListener("click", listener, { capture: true });
        };
    }, []);
};

export default useClickOutside;
