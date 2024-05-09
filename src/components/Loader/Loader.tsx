import { Oval } from "react-loader-spinner"
import css from './Loader.module.css';

type LoaderProps = {
    loading: boolean;
}
const Loader: React.FC<LoaderProps> = ({ loading }) => {
    return (
        <div className={css.loader}>
            {loading &&
                <Oval
                    visible={true}
                    height="50"
                    width="50"
                    color="#5e4ca6"
                    secondaryColor="transparent"
                    ariaLabel="oval-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                />}
        </div>
    )
}

export default Loader