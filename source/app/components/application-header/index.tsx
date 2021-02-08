import { FunctionComponent, h } from "preact"

import { Container } from "app/components/Container"

const ApplicationHeader: FunctionComponent = () => {
    return (
        <header class="application-header">
            <Container>
                <h1>preact-test</h1>
                <p>
                    This is a simple web application that I created to try the Preact library - I have used my typical
                    dev environment which includes Babel, TypeScript, and Webpack.
                </p>
            </Container>
        </header>
    )
}

export {
    ApplicationHeader
}
