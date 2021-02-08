import { FunctionComponent, h } from "preact"
import { useEffect, useRef, useState } from "preact/hooks"

import { Article } from "app/components/article"
import { Container } from "app/components/container"

const ApplicationContent: FunctionComponent = () => {
    const [buttonClickCount, setButtonClickCount] = useState(0)
    const [elementWidth, setElementWidth] = useState(0)
    const [elementHeight, setElementHeight] = useState(0)
    const [inputValue, setInputValue] = useState("")
    const [inputUpdateCount, setInputUpdateCount] = useState(0)
    const elementReference = useRef<HTMLDivElement>()

    useEffect(() => {
        setElementWidth(elementReference.current.offsetWidth)
        setElementHeight(elementReference.current.offsetHeight)
    }, [])

    const increaseClickCount = (event: Event): void => {
        if (event.isTrusted) {
            event.preventDefault()
            setButtonClickCount(buttonClickCount + 1)
        }
    }

    const handleInput = (event: Event): void => {
        if (event.isTrusted) {
            event.preventDefault()

            const input = event.currentTarget as HTMLInputElement

            setInputValue(input.value)
            setInputUpdateCount(inputUpdateCount + 1)
        }
    }

    return (
        <div class="application-content" ref={elementReference}>
            <Container>
                <Article title="Simple state test">
                    <p>Button click count is <strong>{buttonClickCount}</strong></p>
                    <button onClick={increaseClickCount}>Click (or tap)</button>
                </Article>
                <Article title="Element reference test">
                    <p>Content element width is {elementWidth}</p>
                    <p>Content element height is {elementHeight}</p>
                </Article>
                <Article title="Controlled input test">
                    <p>Input update count is <strong>{inputUpdateCount}</strong></p>
                    <input type="text" value={inputValue} onInput={handleInput} />
                </Article>
            </Container>
        </div>
    )
}

export {
    ApplicationContent
}
