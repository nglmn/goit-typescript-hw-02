const ErrorMessage = ({ errorMessage }) => {
    return (
        <div>
            {errorMessage && <h2 style={{ color: "red", fontWeight: 100 }}>No images for your request..</h2>}
        </div>
    )
}

export default ErrorMessage