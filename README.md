# React Bots
> React components for Leadoo bots

[![Build Status](https://travis-ci.org/LeadooMT/react-bot.svg?branch=master)](https://travis-ci.org/LeadooMT/react-bot)

![Leadoo In-Page bot demo](demo.png)

This UI library provides components and helpers for using [Leadoo](https://leadoo.com/) bots within React environments.

> Please note that to use these bot components, you need to have a [Leadoo account](https://leadoo.com/get-leadoo/).

## About

Leadoo bots are complicated JavaScript applications that render complex UI element trees, and they are usually not directly usable within _reactive_ environments such as React. React can update the DOM, removing and moving elements around, many times a second (in extreme cases). Doing so with a Leadoo bot inside could result in large amounts of errors and memory overflow - but this library is designed to handle that.

These React components wrap Leadoo bots and handle all the cleanup and mount/dismount preparation for you.

> Please note that destroying and recreating bot components regularly should be considered an anti-pattern. Do not place bot components in areas or subtrees that are regularly re-rendered.

### Bot Types

Currently only **In-Page** bots are supported (`InPageBot`). These bots are containers that can be placed in content areas.

### Compatibility

These components are designed for the latest version of React, at least version `16.12`.

The bots used within these components are **2nd Generation** - please see your Leadoo contact regarding the version of your bot before using this toolkit.

## Usage

Install by running the following:

```shell
npm install @leadoo/react-bot --save-dev
```

You can import separate bot components to use in your website:

```jsx
import { InPageBot } from "@leadoo/react-bot";

export const MyComponent = () => (
    <div>
        <InPageBot code="abc123" />
    </div>
);
```

## API

### InPageBot

In-Page bot wrapper. Import using `{ InPageBot }`.

Properties:

| Property          | Required  | Default   | Description                           |
|-------------------|-----------|-----------|---------------------------------------|
| `code`            | Yes       | _None_    | The bot code (provided by Leadoo).    |
| `mediaPartner`    |           | _None_    | Optional Media Partner identifier. Enables Media Partner mode. |
| `seamless`        |           | `false`   | Whether to run in **seamless** mode or not. |

Usage is straightforward - import the `InPageBot` component and place it in your application using a bot `code`:

```jsx
import { InPageBot } from "@leadoo/react-bot";

const BOT_CODE = "xyz123";

export const MyApp = () => (
    <div>
        <InPageBot code={BOT_CODE} seamless />
    </div>
);
```

When using a Media Partner configuration, set the `mediaPartner` property to the Media Partner identifier used in your system:

```jsx
import { InPageBot } from "@leadoo/react-bot";

const MEDIA_PARTNER = "MyCompany";

function getSectionCode() {
    return /^\/blog/.test(window.location.pathname)
        ? "blog"
        : "main";
}

export const MyApp = () => (
    <div>
        <InPageBot
            code={getSectionCode()}
            mediaPartner={MEDIA_PARTNER}
        />
    </div>
);
```

Make sure to read the Media Partner concept description.

## Concepts

### Seamless mode

Seamless mode allows the bot to continue expanding, vertically, as content appears within it. This is not the default mode of operation, which is to lock at a certain height and use a scroll-bar to continue viewing content within the bot.

Seamless mode can appear more natural in certain scenarios, as more of the bot content is visible to the user.

### Media Partner

The Media Partner configuration is a subset of functionality available for configuring **In-Page** bots so that they're installation and configuration are handled separately, at different times, and possibly by different teams at a company.

Using a Media Partner setup, bots can be placed on a page using dynamic codes which can be _later_ tied to an actual bot set-up through the UI. Bot scripts that run and do not find an associated bot on that account simply do nothing.
