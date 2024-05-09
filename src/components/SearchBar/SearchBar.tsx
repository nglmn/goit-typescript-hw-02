import { FormEvent } from "react";
import toast, { Toaster } from 'react-hot-toast';
import css from "./SearchBar.module.css";

type SearchBarProps = {
    setInputSearch: (str: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ setInputSearch }) => {
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const search: string = e.target.elements.inputSearch.value;
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