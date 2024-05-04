import css from "./ImageCard.module.css";

const ImageCard = ({ imageProps, openModal }) => {
    const { alt_description, urls: { regular, small } } = imageProps;
    const handleClick = () => {
        openModal(regular)
    }

    return (
        <li className={css.card}>
            <img
                onClick={() => handleClick()}
                src={small}
                alt={alt_description}
                width="300"
                height="300"
                className={css.cardImg} />
        </li>
    )
}

export default ImageCard;