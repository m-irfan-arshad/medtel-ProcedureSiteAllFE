import Login from './AppSelection/component/Login'
import Layout from './common/Layout'
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from './common/ProtectedRoute'
import Applications from './AppSelection/component/Applications'

function App() {
  return (
    <>
      <Routes>
        {/* Root (/) and /login → Login page */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

        {/* Applications page */}
        <Route element={<ProtectedRoute/>}>
          <Route element={<Layout />}>
            <Route path="/applications" element={<Applications />} />
          </Route>
        </Route>

        {/* Catch-all → redirect to /login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  )
}

export default App
