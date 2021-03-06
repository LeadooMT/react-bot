import * as React from "react";
import ReactDOM from "react-dom";
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
            ReactDOM.render(
                <InPageBot code="test" generateScript={fakeScriptInserter} />,
                container
            );
        });
        const divContainer = container.getElementsByTagName("div")[0];
        const script = divContainer.children[0];
        expect(script instanceof HTMLElement).toBe(true);
    });

    test("sets correct standard URL", async () => {
        act(() => {
            ReactDOM.render(
                <InPageBot code="test" generateScript={fakeScriptInserter} />,
                container
            );
        });
        const script = container.getElementsByTagName("script")[0];
        expect(script.dataset.url).toMatch(/bot\.leadoo\.com/);
        expect(script.dataset.url).toMatch(/\?code=test/);
    });

    test("sets correct Media Partner URL", async () => {
        act(() => {
            ReactDOM.render(
                <InPageBot
                    code="test-bot"
                    mediaPartner="amazing"
                    generateScript={fakeScriptInserter}
                />,
                container
            );
        });
        const script = container.getElementsByTagName("script")[0];
        expect(script.dataset.url).toMatch(/bot\.leadoo\.com\/bot\/mp/);
        expect(script.dataset.url).toMatch(/[?&]code=test-bot/);
        expect(script.dataset.url).toMatch(/[?&]media=amazing/);
    });

    test("includes seamless flag in URL", async () => {
        act(() => {
            ReactDOM.render(
                <InPageBot code="test" generateScript={fakeScriptInserter} seamless />,
                container
            );
        });
        const script = container.getElementsByTagName("script")[0];
        expect(script.dataset.url).toMatch(/bot\.leadoo\.com/);
        expect(script.dataset.url).toMatch(/[#,]seamless/);
    });
});
