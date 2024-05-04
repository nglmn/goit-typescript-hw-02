import css from "./LoadMoreBtn.module.css";

//prop types react
/* 
    1. когда в масиве фот-фий есть єлементи і пейдж < тотал пейдж
*/

const LoadMoreBtn = ({ loadMoreImages }) => {
    return (
        <button
            className={css.loadBtn}
            type="button"
            onClick={loadMoreImages}>Load more
        </button >
    )
}

export default LoadMoreBtn