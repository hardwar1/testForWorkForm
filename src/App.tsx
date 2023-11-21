import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { PopupForm } from './shared/PopupForm'
// import styles from './app.module.scss'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/testForWorkForm/' element={<PopupForm />} />
        <Route path="*" element={<Navigate to="/testForWorkForm/" replace />} />
      </Routes>

    </BrowserRouter>
  )
}

export default App

