import { useRef, useEffect, FC } from "react";
import "./preview.css";

interface PreviewProps {
    code: string;
    err: string;
}

const Preview: FC<PreviewProps> = ({ code, err }) => {
    const iframe = useRef<HTMLIFrameElement | null>(null);
    let html = ``;

    useEffect(() => {
        if (!iframe.current) {
            return;
        }
        html = `
            <html>
            <head></head>
            <body>
                <div id="root"></div>
                <script type='text/javascript' id='dynamic-script'>
                    const handleError = (err) => {
                        const root = document.querySelector("#root");
                        root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
                        console.error(err);
                    }
                    window.top.addEventListener("message", (event) => {
                        try {
                            eval(event.data);
                        } catch (err) {
                            handleError(err);
                        }
                    },false);
                    window.top.addEventListener("error", (event) => {
                        event.preventDefault();
                        handleError(event.error);
                    })
                </script>
            </body>
            </html>
        `;
        iframe.current.srcdoc = html;

        setTimeout(() => {
            window.postMessage(code, "*");
        }, 100);
    }, [code]);

    return (
        <div className="preview-wrapper">
            <iframe
                ref={iframe}
                title="preview"
                sandbox="allow-scripts allow-same-origin"
                srcDoc={html}
            ></iframe>
            {err && <div className="preview-error">{err}</div>}
        </div>
    );
};

export default Preview;
