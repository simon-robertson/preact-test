import { FunctionComponent, h } from "preact"

type Props = {
    readonly title: string
}

const Article: FunctionComponent<Props> = ((props) => {
    return (
        <article class="article">
            <header>
                <h1>{props.title}</h1>
            </header>
            {props.children}
        </article>
    )
})

export {
    Article
}
