import { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div>
            <form>
                <h1>Login</h1>
                <p>Welcome back! Enter your credentials below.</p>
                <Input label="Email" value={email} onChange={setEmail} type="email" />
                <Input label="Password" value={password} onChange={setPassword} type="password" />
                <Button label="Login" type="submit" />
            </form>
        </div>
    )
}

export default Login;