export function CustomInput({ type = "text", id, name, placeholder, required = false, className}) {
    return (
        <input
            type={type}
            id={id}
            name={name}
            placeholder={placeholder} required
            className={"w-[400px] p-3 border border-black  border-r-4 border-b-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 animate-fadeIn " + className}
        />
    ); 

}