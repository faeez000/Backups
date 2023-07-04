export default function FieldWrapper({ children }) {
    return (
        <div className="w-full flex flex-col font-semibold justify-start mb-3">
            {children}
        </div>
    );
}
