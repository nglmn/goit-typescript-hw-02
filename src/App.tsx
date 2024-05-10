import { useState, useEffect, useMemo, SetStateAction } from "react";
import Modal from 'react-modal';
import { ApiImageKeys, ImagesTypeObj } from "./types";

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
	const [images, setImages] = useState<ApiImageKeys[]>([]);
	const [totalPages, setTotalPages] = useState<number>(0);
	const [total, setTotal] = useState<number>(0);
	const [inputSearch, setInputSearch] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);
	const [showMoreBtn, setShowMoreBtn] = useState<boolean>(false);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [errorMessage, setErrorMessage] = useState<boolean>(false);
	const [modalSizeImg, setModalSizeImg] = useState<string | null>(null);
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	const changedUserInput = useMemo(() => {
		setCurrentPage(1);
		setImages([]);
		setTotalPages(0);
		setTotal(0);
	}, [inputSearch]);

	useEffect(() => {
		if (!inputSearch) return;
		async function getData() {
			try {
				setErrorMessage(false);
				setShowMoreBtn(false);
				setLoading(true);

				const data: ImagesTypeObj = await getDataFromAPI(inputSearch, currentPage);
				if (data.total === 0) {
					return setErrorMessage(true);
				}
				if (data.total_pages > currentPage) {
					setImages(prev => [...prev, ...data.results]);
					setTotalPages(data.total_pages);
					setTotal(data.total);
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
				{images &&
					<ImageGallery
						images={images}
						openModal={openModal}
					/>
				 }
				{loading
					? <Loader loading={loading} />
					: (showMoreBtn && <LoadMoreBtn loadMoreImages={loadMoreImages} />)
				}
				<ErrorMessage errorMessage={errorMessage} />
				{modalSizeImg
					&& <ImageModal
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