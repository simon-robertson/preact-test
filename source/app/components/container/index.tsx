import { FunctionComponent, h } from "preact"

const Container: FunctionComponent = (props) => {
    return (
        <div class="container">
            {props.children}
        </div>
    )
}

export {
    Container
}
