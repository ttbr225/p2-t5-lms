import { Routes, Route } from 'react-router'
import Login from './pages/Login'

function App() {
  return (
    <Routes>
      <Route path="/" element={<h1>Home</h1>} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<h1>Register</h1>} />
    </Routes>
  )
}

export default App