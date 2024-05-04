import { useState, useEffect, useMemo } from "react";
import Modal from 'react-modal';

import ImageGallery from "./components/ImageGallery/ImageGallery";
import SearchBar from "./components/SearchBar/SearchBar";
import Loader from "./components/Loader/Loader";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import ImageModal from "./components/ImageModal/ImageModal";
import { getDataFromAPI } from "./services/api";

import "./App.css";

Modal.setAppElement('#root');

const App = () => {
	const [images, setImages] = useState({
		results: [],
		total_pages: 0,
		total: 0
	});
	const [inputSearch, setInputSearch] = useState("");
	const [loading, setLoading] = useState(false);
	const [showMoreBtn, setShowMoreBtn] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [errorMessage, setErrorMessage] = useState(false);
	const [modalSizeImg, setModalSizeImg] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const changedUserInput = useMemo(() => {
		setCurrentPage(1);
		setImages({
			results: [],
			total_pages: 0,
			total: 0
		})
	}, [inputSearch]);

	useEffect(() => {
		if (!inputSearch) return;
		async function getData() {
			try {
				setErrorMessage(false);
				setShowMoreBtn(false);
				setLoading(true);

				const response = await getDataFromAPI(inputSearch, currentPage);
				if (response.data.total === 0) {
					return setErrorMessage(true);
				}
				if (response.data.total_pages > currentPage) {
					setImages((prevState) => {
						return {
							results: [...prevState.results, ...response.data.results],
							total_pages: response.data.total_pages,
							total: response.data.total
						};
					})
					setShowMoreBtn(true);
				}
			} catch (error) {
				setErrorMessage(true);

			} finally {
				setLoading(false);
			}
		}
		getData();
	}, [inputSearch, currentPage, changedUserInput])

	function loadMoreImages() {
		setCurrentPage(currentPage + 1);
	}
	const openModal = imageUrl => {
		setIsModalOpen(true);
		setModalSizeImg(imageUrl)
	}
	function closeModal() {
		setIsModalOpen(false);
		setModalSizeImg(null);
	}

	return (
		<>
			<SearchBar setInputSearch={setInputSearch} />
			<div className="content">
				<ImageGallery
					images={images.results}
					openModal={openModal} />
				{loading
					? <Loader loading={loading} />
					: (showMoreBtn && <LoadMoreBtn loadMoreImages={loadMoreImages} />)}
				<ErrorMessage errorMessage={errorMessage} />
				{modalSizeImg
					&& <ImageModal
						openModal={openModal}
						isOpen={isModalOpen}
						modalSizeImg={modalSizeImg}
						closeModal={closeModal} />}
			</div>
		</>
	)
}

export default App;