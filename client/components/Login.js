import React from 'react'

function Login() {
    const [user, setUser] = useState(null);

    const login = () => {}

    return (
        <div className="login">
            <label>Login</label>
            <input
                placeholder="Username"
                onChange={(event) => {
                    setUser({ ...user, username: event.target.value })
                }}
            />
            <input
                placeholder="Password"
                onChange={(event) => {
                    setUser({ ...user, password: event.target.value })
                }}
            />
            <button onClick={login}>Login</button>
        </div>
    )
}

export default Login