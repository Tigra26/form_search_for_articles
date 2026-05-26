import type { Article } from "../../types/article";

interface ArticleListProps {
    articles: Article[];
}

export default function ArticleList ({articles}: ArticleListProps) {
    return (
        <ul>
            {articles.map(({ objectID, title, url}) => (
                <li key={objectID}>
                    <a target="_blanc" rel="noopener noreferrer" href={url}>{title}</a>
                </li>
            ))}
        </ul>
    )

}