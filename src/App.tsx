import { useState, useEffect, useMemo, SetStateAction } from "react";
import Modal from 'react-modal';
import { ImagesTypeObj } from "./types";

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
	const [images, setImages] = useState<ImagesTypeObj>({
		results: [],
		total_pages: 0,
		total: 0
	});
	const [inputSearch, setInputSearch] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);
	const [showMoreBtn, setShowMoreBtn] = useState<boolean>(false);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [errorMessage, setErrorMessage] = useState<boolean>(false);
	const [modalSizeImg, setModalSizeImg] = useState<string | null>(null);
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	const changedUserInput = useMemo(() => {
		setCurrentPage(1);
		setImages({
			results: [],
			total_pages: 0,
			total: 0
		})
	}, [] as const);

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

	function loadMoreImages(): void {
		setCurrentPage(currentPage + 1);
	}
	function openModal(imageUrl: string): void {
		setIsModalOpen(true);
		setModalSizeImg(imageUrl)
	}
	function closeModal(): void {
		setIsModalOpen(false);
		setModalSizeImg(null);
	}

	return (
		<>
			<SearchBar setInputSearch={setInputSearch} />
			<div className="content">
				<ImageGallery
					images={images.results}
					openModal={openModal}
				/>
				{loading
					? <Loader loading={loading} />
					: (showMoreBtn && <LoadMoreBtn loadMoreImages={loadMoreImages} />)
				}
				<ErrorMessage errorMessage={errorMessage} />
				{modalSizeImg
					&& <ImageModal
						openModal={openModal}
						isOpen={isModalOpen}
						modalSizeImg={modalSizeImg}
						closeModal={closeModal}
						/>
				}
			</div>
		</>
	)
}

export default App;