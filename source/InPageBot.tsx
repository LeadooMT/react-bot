import * as React from "react";
import { BotCode, InPageBotProps } from "./types";
import { destroyBot, generateAPIName } from "./helpers";

const { useEffect, useRef, useState } = React;

const NOOP = () => {};
const PATH_MP = "/bot/mp/inpage.js?code=";
const PATH_STANDARD = "/bot/inpage.js?code=";
const URL_BASE = "https://bot.leadoo.com";

function getBotURL(
    code: BotCode,
    apiName: string,
    seamless: boolean,
    mediaPartner: string
): string {
    let url: string;
    if (mediaPartner) {
        url = `${URL_BASE}${PATH_MP}${code}&media=${encodeURIComponent(mediaPartner)}`;
    } else {
        url = `${URL_BASE}${PATH_STANDARD}${code}`;
    }
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
    const { code, mediaPartner = null, seamless = false } = props;
    // Hooks
    const [apiName, setAPIName] = useState(generateAPIName());
    const [botURL, setBotURL] = useState(null);
    const containerRef = useRef(null);
    const mountedRef = useRef(null);
    useEffect(() => {
        // API name change
        if (apiName) {
            setBotURL(getBotURL(code, apiName, seamless, mediaPartner));
        }
    }, [apiName]);
    useEffect(() => {
        // Attaching script
        if (containerRef.current && botURL) {
            const script = (mountedRef.current = document.createElement("script"));
            script.src = botURL;
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
