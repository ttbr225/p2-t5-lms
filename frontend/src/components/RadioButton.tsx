interface RadioButtonProps {
    question: string,
    value: string,
    choices: [],
    onChange: (value: string) => void,
}

function RadioButton({question, choices}: RadioButtonProps) {
    return (
        <div>
            <p>{question}</p>
            <label>Please select one: </label>
            {choices.map((choice) => (
                <label>
                    <input type="radio" value={choice} />
                    {choice}
                </label>
            ))}
        </div>
    );
}

export default RadioButton;