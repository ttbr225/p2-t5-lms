interface InputProps {
    label: string,
    value: string,
    type: 'text' | 'email' | 'password',
    onChange: (value: string) => void,
}

function Input({ label, value, type, onChange }: InputProps) {
    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    onChange(event.target.value);
    }

    return (
        <div className="flex flex-col h-auto">
            <label htmlFor={label} className="text-sm">{ label }</label>
            <input id={label} name={label} type={type} placeholder={`Enter your ${label}`} value={value} onChange={handleChange} className="border border-red-500 py-1" />
        </div>
    )
}

export default Input