import * as React from "react";
import { createRoot } from "react-dom/client";
import { act } from "react-dom/test-utils";
import { InPageBot } from "../source/InPageBot";

let container;

function fakeScriptInserter(url) {
    const script = document.createElement("script");
    script.dataset.url = url;
    script.innerText = "//test";
    return script;
}

beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    document.body.removeChild(container);
    container = null;
});

describe("InPageBot", () => {
    test("inserts script", async () => {
        act(() => {
            const root = createRoot(container);
            root.render(<InPageBot code="test" generateScript={fakeScriptInserter} />);
        });
        const divContainer = container.getElementsByTagName("div")[0];
        const script = divContainer.children[0];
        expect(script instanceof HTMLElement).toBe(true);
    });

    test("sets correct standard URL", async () => {
        act(() => {
            const root = createRoot(container);
            root.render(<InPageBot code="test" generateScript={fakeScriptInserter} />);
        });
        const script = container.getElementsByTagName("script")[0];
        expect(script.dataset.url).toMatch(/bot\.leadoo\.com/);
        expect(script.dataset.url).toMatch(/\?code=test/);
    });

    test("sets correct Media Partner URL", async () => {
        act(() => {
            const root = createRoot(container);
            root.render(
                <InPageBot
                    code="test-bot"
                    mediaPartner="amazing"
                    generateScript={fakeScriptInserter}
                />,
            );
        });
        const script = container.getElementsByTagName("script")[0];
        expect(script.dataset.url).toMatch(/bot\.leadoo\.com\/bot\/mp/);
        expect(script.dataset.url).toMatch(/[?&]code=test-bot/);
        expect(script.dataset.url).toMatch(/[?&]media=amazing/);
    });

    test("includes seamless flag in URL", async () => {
        act(() => {
            const root = createRoot(container);
            root.render(<InPageBot code="test" generateScript={fakeScriptInserter} seamless />);
        });
        const script = container.getElementsByTagName("script")[0];
        expect(script.dataset.url).toMatch(/bot\.leadoo\.com/);
        expect(script.dataset.url).toMatch(/[#,]seamless/);
    });
});
