import React from "react";
import HomeScreen from "./screens/HomeScreen";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  return (
    <>
      <HomeScreen />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default App;
