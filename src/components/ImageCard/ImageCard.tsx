import { ApiImageKeys } from "../../types";
import css from "./ImageCard.module.css";

type ImageCardProps = {
    imageProps: {
        alt_description: string;
        urls: {
            regular: string;
            small: string;
        }
    };
    id: string;
    openModal: (imageUrl: string) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ imageProps, openModal }) => {
    const { alt_description, urls: { regular, small } } = imageProps;
    const handleClick = (): void => {
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