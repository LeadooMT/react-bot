# React Bots
> React components for Leadoo bots

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

| Property      | Required  | Default   | Description                           |
|---------------|-----------|-----------|---------------------------------------|
| `code`        | Yes       | _None_    | The bot code (provided by Leadoo)     |
| `seamless`    |           | `false`   | Whether to run in **seamless** mode or not. |

## Concepts

### Seamless mode

Seamless mode allows the bot to continue expanding, vertically, as content appears within it. This is not the default mode of operation, which is to lock at a certain height and use a scroll-bar to continue viewing content within the bot.

Seamless mode can appear more natural in certain scenarios, as more of the bot content is visible to the user.
