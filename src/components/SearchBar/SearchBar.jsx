import toast, { Toaster } from 'react-hot-toast';
import css from "./SearchBar.module.css";

const SearchBar = ({ setInputSearch }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        const search = e.target.elements.inputSearch.value;
        if (!search) {
            return toast.error("The field is empty");
        } else {
            setInputSearch(search);
        }
        e.target.reset();
    }
    return (
        <header className={css.header}>
            <form className={css.form} onSubmit={handleSubmit}>
                <input
                    className={css.input}
                    name="inputSearch"
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos" />
                <button type="submit" className={css.submitBtn}>Search</button>
            </form>
            <Toaster />
        </header>
    )
}

export default SearchBar