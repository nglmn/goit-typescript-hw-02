
type ErrorMessageProps = {
    errorMessage: boolean;
}
const ErrorMessage: React.FC<ErrorMessageProps> = ({ errorMessage }) => {
    return (
        <div>
            {errorMessage && <h2 style={{ color: "red", fontWeight: 100 }}>No images for your request..</h2>}
        </div>
    )
}

export default ErrorMessage