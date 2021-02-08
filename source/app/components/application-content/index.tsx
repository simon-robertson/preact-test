import { FunctionComponent, h } from "preact"
import { useEffect, useRef, useState } from "preact/hooks"

import { Article } from "app/components/article"
import { Container } from "app/components/container"

const ApplicationContent: FunctionComponent = () => {
    const [clickCount, setClickCount] = useState(0)
    const [elementWidth, setElementWidth] = useState(0)
    const [elementHeight, setElementHeight] = useState(0)
    const elementReference = useRef<HTMLDivElement>()

    useEffect(() => {
        setElementWidth(elementReference.current.offsetWidth)
        setElementHeight(elementReference.current.offsetHeight)
    }, [])

    const increaseClickCount = (event: MouseEvent): void => {
        if (event.isTrusted) {
            event.preventDefault()
            setClickCount((value) => value + 1)
        }
    }

    return (
        <div class="application-content" ref={elementReference}>
            <Container>
                <Article title="Simple state test">
                    <p>Click count is <strong>{clickCount}</strong></p>
                    <button onClick={increaseClickCount}>Increase click count</button>
                </Article>
                <Article title="Element reference test">
                    <p>Content element width is {elementWidth}</p>
                    <p>Content element height is {elementHeight}</p>
                </Article>
            </Container>
        </div>
    )
}

export {
    ApplicationContent
}
