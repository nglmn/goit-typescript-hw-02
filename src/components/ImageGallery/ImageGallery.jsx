import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";

const ImageGallery = ({ images, openModal }) => {
    return (
        <ul className={css.gallery}>
            {images.map(({ id, ...imageProps }) => (
                <ImageCard key={id} imageProps={imageProps} id={id} openModal={openModal} />
            ))}
        </ul>
    )
}

export default ImageGallery;