import { useRef, useEffect, FC } from "react";
import "./preview.css";

interface PreviewProps {
    code: string;
    err: string;
}

const Preview: FC<PreviewProps> = ({ code, err }) => {
    const iframe = useRef<HTMLIFrameElement | null>(null);
    let html = ``;
    const bc = new BroadcastChannel("code-channel");

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
                    const bc = new BroadcastChannel("code-channel");
                    console.log("broadcast channel", bc);
                    console.log("window.location", window.location);
                    bc.postMessage("console.log('message from the iframe preview')");
                    bc.onmessage = (ev) => {
                        console.log("event in broadcast", ev);
                    }
                    bc.onmessageerror = (ev) => {
                        console.log("event error in broadcast", ev)
                    }
                    window.addEventListener("message", (event) => {
                        try {
                            eval(event.data);
                        } catch (err) {
                            handleError(err);
                        }
                    },false);
                </script>
            </body>
            </html>
        `;
        iframe.current.srcdoc = html;

        // create a persistent broadcast channel
        setTimeout(() => {
            bc.postMessage(code);
        }, 100);

        return () => bc.close();
    }, [code]);

    useEffect(() => {
        bc.onmessage = (ev) => {
            console.log("event message in bc preview", ev);
        };
    }, [bc.onmessage]);

    useEffect(() => {
        bc.onmessageerror = (ev) => {
            console.log("event error in bc preview", ev);
        };
    }, [bc.onmessageerror]);

    return (
        <div className="preview-wrapper">
            <iframe
                ref={iframe}
                title="preview"
                sandbox="allow-scripts"
                srcDoc={html}
            ></iframe>
            {err && <div className="preview-error">{err}</div>}
        </div>
    );
};

export default Preview;
