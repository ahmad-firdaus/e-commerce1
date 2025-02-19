export function FieldBottom({ type = "button", className = className, children }) {
    return (
        <button
            type="submit"
            className={"py-4 px-4  border border-black bg-blue-500 text-white rounded-lg hover:border-green-600 hover:bg-green-600 hover:text-white transition duration-200 animate-fadeIn font-sofia font-medium " + className}
        >
            {children}
        </button>
    );

}