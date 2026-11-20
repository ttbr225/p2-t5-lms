interface ButtonProps {
    label: string,
    disabled: boolean,
    type: 'button' | 'submit' | 'reset',
    onClick: () => void,
}

function Button({label, disabled, type, onClick}: ButtonProps) {
return (
<button type={ type } disabled={disabled} onClick={ onClick } >{ label }</button>
    )
}

export default Button;