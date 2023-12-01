import { LeadooWindow } from "./types.js";

declare var window: LeadooWindow;

export function destroyBot(apiName: string): Promise<void> {
    const apiRoot = window.Leadoo?.Custom?.[apiName];
    if (!apiRoot) return Promise.resolve();
    return apiRoot.destroy();
}

export function generateAPIName(): string {
    return `_reactBot${Math.floor(Math.random() * 999999)}`;
}

export function generateScript(src: string): HTMLScriptElement {
    const script = document.createElement("script");
    script.src = src;
    return script;
}
