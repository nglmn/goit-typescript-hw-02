import Modal from "react-modal";
import css from "./ImageModal.module.css";

type ImageModalProps = {
    modalSizeImg: string;
    isOpen: boolean;
    closeModal: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ modalSizeImg, closeModal, isOpen }) => {
    return (
        <Modal
            isOpen={isOpen}
            className={css.modal}
            overlayClassName={css.overlay}
            onRequestClose={closeModal}>
            <img src={modalSizeImg} alt="modal" width="700" height="500" className={css.modalImage} />
        </Modal>
    )
}

export default ImageModal