interface InputProps {
    label: string,
    field: string,
    type: 'text' | 'email' | 'password',
}

function Input({ label, field, type }: InputProps) {
    return (
        <div className="flex flex-col h-auto">
            <label htmlFor={field} className="text-sm">{ label }</label>
            <input id={field} name={field} type={type} placeholder={`Enter your ${label}`} className="border border-red-500 py-1" />
        </div>
    )
}

export default Input