import { useState } from "react"
import Input from "../components/Input"
import Button from "../components/Button";

function Register() {
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');

    return (
        <div>
            <Input label="Email" value={email} type="email" onChange={setEmail} />
            <Input label="First Name" value={firstName} type="text" onChange={setFirstName} />
            <Input label="Last Name" value={lastName} type="text" onChange={setLastName} />
            <Input label="Password" value={password} type="password" onChange={setPassword} />
            <Input label="verifyPassword" value={verifyPassword} type="password" onChange={setVerifyPassword} />
            <Button label="Register" type="submit" />
        </div>
    )
}

export default Register;