import { FunctionComponent, h } from "preact"

import { Container } from "app/components/container"

const ApplicationFooter: FunctionComponent = () => {
    return (
        <footer class="application-footer">
            <Container>
                <p>Source code is available at <a href="https://github.com/simon-robertson/preact-test">GitHub</a></p>
            </Container>
        </footer>
    )
}

export {
    ApplicationFooter
}
