# Toastify-Simply-React

Just toasts got better and simpler

[![npm](https://img.shields.io/npm/v/toastify-simply-react)](https://www.npmjs.com/package/toastify-simply-react)
![npm](https://img.shields.io/npm/dt/toastify-simply-react?color=yellow)
[![Scrutinizer code quality (GitHub/Bitbucket)](https://img.shields.io/scrutinizer/quality/g/Waveshade-Studios/toastify-simply-react?color=CA63DD&logo=scrutinizer)](https://scrutinizer-ci.com/g/Waveshade-Studios/toastify-simply-react)
[![Scrutinizer build (GitHub/Bitbucket)](https://img.shields.io/scrutinizer/build/g/Waveshade-Studios/toastify-simply-react?logo=scrutinizer)](https://scrutinizer-ci.com/g/Waveshade-Studios/toastify-simply-react/build-status)
![Codecov](https://img.shields.io/codecov/c/gh/Waveshade-Studios/toastify-simply-react?color=orange&logo=codecov)
![GitHub Workflow Status](https://img.shields.io/github/workflow/status/Waveshade-Studios/toastify-simply-react/CI%20&%20Coverage?logo=github)

Visit official [site](https://toastify-simply-react.herokuapp.com/) for better overview and [documentation](https://toastify-simply-react.herokuapp.com/read-docs).

## Installation

```markdown
# yarn add toastify-simply-react

**or**

# npm install --save toastify-simply-react
```

## Demo

A demo in live action is worth than million words.
[See Live Action](https://toastify-simply-react.herokuapp.com/demo-playground)

## Available props list

[See props list](https://toastify-simply-react.herokuapp.com/read-docs/props)


## How to use

It's quiet simple


```jsx
## With hooks

import {useToast, Toast} from "toastify-simply-react";

function MyComponent() {
    const [toast, toastRef] = useToast(); // generate toast and toastRef

    return (
        <div>
            <button onClick={() => toast.primary("Hello!")}>show toast</button>

            <Toast ref={toastRef} /> // Toast component
        </div>
    );
}

## With functions

import {toastClass, toastFunction, Toast} from "toastify-simply-react";

class MyComponent extends Component{
    toastRef = toastClass(); // generate toastRef

    componentDidMount() {
        this.toast = toastFunction(toastRef); // generate toast
    }

    render() {
        return (
            <div>
                <button onClick={() => this.toast.primary("Hello!")}>show toast</button>

                <Toast ref={this.toastRef} /> // Toast component
            </div>
        );
    }
}
```

## Documentation
[Github Pages](https://waveshade-studios.github.io/toastify-simply-react)

[Official Site](https://toastify-simply-react.herokuapp.com/)

[Documentation](https://toastify-simply-react.herokuapp.com/read-docs)

## Contribution

## Financial Contribution

[Contribute](https://opencollective.com/toastify-simply-react), if you like the work, you can [support us](https://opencollective.com/toastify-simply-react/contribute/reliever-19802/checkout)

### Contributors

<a href="https://github.com/rohit231095"><img src="http://i.imgur.com/XHjuWgo.png" width="40" height="40" style="border-radius:50%;" /></a> <a href="https://github.com/Waveshade-Studios"><img src="https://avatars1.githubusercontent.com/u/68241259?s=60&v=4" width="40" height="40" style="border-radius:50%;" /></a>


## Code Contribution

```markdown
# Ways to contribute

## by coding some stuff together
- Fork the repository from `master` branch
- Fixed the things in your branch or forked repo
- Generate the pull request back to `master` branch to this library

## raise an issue
- Create an issue [here](https://github.com/Waveshade-Studios/toastify-simply-react/issues)
- Add required labels to it
- Issue will be reviewed, fixed and released as per the priority
```


## Financing

Any special requirement or feature will be handled at priority, with minimal financial assistance, you can [email us](mailto:waveshade.studios@gmail.com?subject=Proposal-Toastify-Simply-React) directly and [contribute here](https://opencollective.com/toastify-simply-react).

# Release Notes

Latest release [here](https://toastify-simply-react.herokuapp.com/releases)

All releases [here](https://toastify-simply-react.herokuapp.com/releases)