import ImageCard from "../ImageCard/ImageCard";
import { ApiImageKeys } from "../../types";
import css from "./ImageGallery.module.css";

type ImageGalleryProps = {
    images: ApiImageKeys[];
    openModal: (imegeUrl: string) => void;
}
type UrlImageProps = {
    regular: string;
    small: string;
}
type ImageProps = {
    alt_description: string,
    urls: UrlImageProps
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, openModal }) => {
    console.log(images);
    return (
        <ul className={css.gallery}>
            {images.map(({ id, ...imageProps }) => (
                <ImageCard key={id} imageProps={imageProps} id={id} openModal={openModal} />
            ))}
        </ul>
    )
}

export default ImageGallery;