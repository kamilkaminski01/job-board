import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './style.scss'

const AlertContainer = () => {
  return (
    <ToastContainer
      className="alert-container"
      position="bottom-left"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  )
}

export default AlertContainer
