import { h, render } from "preact"

import { Application } from "app/components/application"

const main = (): void => {
    const element = (
        <Application />
    )
    const container = document.querySelector("main.application")

    if (container !== null) {
        render(element, container)
    }
}

main()
