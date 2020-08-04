import * as React from "react";
import { BotCode, InPageBotProps } from "./types";
import { destroyBot, generateAPIName } from "./helpers";

const { useEffect, useRef, useState } = React;

const URL_BASE = "http://localhost:10300/bot/inpage.js?code=";

function getBotURL(code: BotCode, apiName: string, seamless: boolean): string {
    let url = `${URL_BASE}${code}`;
    const fragments = [`api=${apiName}`];
    if (seamless) {
        fragments.push("seamless");
    }
    if (fragments.length > 0) {
        url = `${url}#${fragments.join(",")}`;
    }
    return url;
}

export function InPageBot(props: InPageBotProps) {
    // Init
    const {
        code,
        seamless = true
    } = props;
    // Hooks
    const [apiName] = useState(generateAPIName());
    const [botURL] = useState(getBotURL(code, apiName, seamless));
    const containerRef = useRef(null);
    const mountedRef = useRef(null);
    useEffect(() => { // Attaching script
        if (containerRef.current) {
            const script = mountedRef.current = document.createElement("script");
            script.src = botURL;
            containerRef.current.appendChild(script);
        }
        return () => { // Unmount
            destroyBot(apiName).catch(err => {
                console.error("Failed cleaning up bot:", err);
            });
        };
    }, [containerRef.current]);
    // Output
    return (
        <div ref={containerRef}>
            {/* Script gets inserted here */}
        </div>
    );
}
