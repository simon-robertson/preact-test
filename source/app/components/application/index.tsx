import { Fragment, FunctionComponent, h } from "preact"

import { ApplicationContent } from "app/components/application-content"
import { ApplicationFooter } from "app/components/application-footer"
import { ApplicationHeader } from "app/components/application-header"

const Application: FunctionComponent = () => {
    return (
        <Fragment>
            <ApplicationHeader />
            <ApplicationContent />
            <ApplicationFooter />
        </Fragment>
    )
}

export {
    Application
}
