export type BotCode = string;

export interface InPageBotProps {
    code: BotCode;
    generateScript?: (scriptSrc: string) => HTMLScriptElement;
    mediaPartner?: string;
    seamless?: boolean;
}

export interface LeadooWindow extends Window {
    Leadoo: {
        Chat: Object;
        Custom: {
            [key: string]: {
                destroy: () => Promise<void>;
            };
        };
        InPage: Object;
    };
}
