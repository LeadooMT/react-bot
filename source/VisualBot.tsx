import * as React from "react";
import { BotCode, VisualBotProps } from "./types";
import { destroyBot, generateAPIName, generateScript as _generateScript } from "./helpers";

const { useEffect, useRef, useState } = React;

const NOOP = () => {};
const PATH_STANDARD = "/bot/visual.js?code=";
const URL_BASE = "https://bot.leadoo.com";

function getBotURL(code: BotCode, apiName: string, seamless: boolean): string {
    let url: string;
    url = `${URL_BASE}${PATH_STANDARD}${code}`;
    const fragments = [`api=${apiName}`];
    if (seamless) {
        fragments.push("seamless");
    }
    if (fragments.length > 0) {
        url = `${url}#${fragments.join(",")}`;
    }
    return url;
}

export function VisualBot(props: VisualBotProps) {
    // Init
    const { code, generateScript = _generateScript, seamless = false } = props;
    // Hooks
    const [apiName, setAPIName] = useState(generateAPIName());
    const [botURL, setBotURL] = useState(null);
    const containerRef = useRef(null);
    const mountedRef = useRef(null);
    useEffect(() => {
        // API name change
        if (apiName) {
            setBotURL(getBotURL(code, apiName, seamless));
        }
    }, [apiName]);
    useEffect(() => {
        // Attaching script
        if (containerRef.current && botURL) {
            const script = (mountedRef.current = generateScript(botURL));
            containerRef.current.appendChild(script);
        } else {
            return NOOP;
        }
        return () => {
            // Unmount
            destroyBot(apiName).catch(err => {
                console.error("Failed cleaning up bot:", err);
            });
            // Reset API name
            setAPIName(generateAPIName());
        };
    }, [botURL, containerRef.current]);
    // Output
    return <div ref={containerRef}>{/* Script gets inserted here */}</div>;
}
