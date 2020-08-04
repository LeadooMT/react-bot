import { LeadooWindow } from "./types";

declare var window: LeadooWindow;

export function destroyBot(apiName: string): Promise<void> {
    const apiRoot = window.Leadoo.Custom[apiName];
    return apiRoot.destroy();
}

export function generateAPIName(): string {
    return `_reactBot${Math.floor(Math.random() * 999999)}`;
}
