# preact-test

This is a simple web application that I created to try the [Preact](https://github.com/preactjs/preact) library - I have used my typical dev environment which includes Babel, TypeScript, and Webpack. Visual Studio Code my editor of choice.

---

The application is running at https://simon-robertson.github.io/preact-test/

---

## Notable changes from the use of React

While the switch from React to Preact was a fairly painless one, there were a few tweaks that needed to be made.

### babel

When building a React based application I use the `@babel/preset-react` preset, but for Preact that needed to be replace with the `@babel/plugin-transform-react-jsx` plugin. The `jsxPragma` had to also be set for the `@babel/preset-typescript` preset.

```
const pluginJSX = [
    "@babel/transform-react-jsx", {
        pragma: "h"
    }
]

const presetTypeScript = [
    "@babel/preset-typescript", {
        jsxPragma: "h"
    }
]
```

Apart from that my usual build process remained the same.

### eslint

The `eslint-react-plugin` was needed and the `"pragma"` set to `"h"` to avoid "unused variable" warnings; but that makes sense. No doubt the Preact team will release an official plugin at some point, but for now the React one works fine. The only issue here is you may see a warning from the plugin regarding the React version, but that can be safely ignored.

```
"settings": {
    "react": {
        "pragma": "h"
    }
},
```

In the TypScript environment I did need to disable these rules:

```
"react/no-unknown-property": "off",
"react/prop-types": "off",
```

The `no-unknown-property` rule, when enabled, warns about the use of the JSX `class` attribute which Preact recommends using. The `prop-types` rule is not needed in TypeScript, those are defined by types or interfaces instead of using the `prop-types` library.

But again, the plugin is designed for React not Preact, so it's all good.

### jsx

The actual JSX syntax remained the same except for the use of the `class` attribute instead of `className` as used in React, and the use of standard events.

```
const Hello: FunctionComponent = () => {
    const handleClick = (event: MouseEvent): void => {
        //
    }

    return (
        <div class="my-component" onClick={handleClick}>
            Hello
        </div>
    )
}
```

The `h` namespace also had to be imported whenever JSX was used.

```
import { h } from "preact"
```

### tsconfig

The app `tsconfig` file needed some extra JSX related values set.

```
"jsx": "preserve",
"jsxFactory": "h",
"jsxFragmentFactory": "Fragment",
```
