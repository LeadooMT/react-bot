import React from "react";
import { InPageBot } from "../source/index.js";

const DEMO_MEDIA = "TestMediaCode";
const DEMO_MEDIA_BOT_CODE = "react-bot";

export default { title: "InPageBot (Media Partner)" };

export const successfulLookup = () => (
    <InPageBot code={DEMO_MEDIA_BOT_CODE} mediaPartner={DEMO_MEDIA} seamless />
);

export const noBotForCode = () => (
    <InPageBot code="example-empty-code" mediaPartner={DEMO_MEDIA} seamless />
);
