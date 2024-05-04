import Modal from "react-modal";
import css from "./ImageModal.module.css";

const ImageModal = ({ modalSizeImg, openModal, closeModal }) => {
    return (
        <Modal
            isOpen={openModal}
            className={css.modal}
            overlayClassName={css.overlay}
            onRequestClose={closeModal}>
            <img src={modalSizeImg} alt="modal" width="700" height="500" className={css.modalImage} />
        </Modal>
    )
}

export default ImageModal