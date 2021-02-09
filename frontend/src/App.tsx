import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Modal from 'react-modal';
import { ToastContainer, ToastOptions, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import SearchPage from './pages/SearchPage';
import FavoritesPage from './pages/FavoritesPage';
import SignUp from './components/SignUp';

function App() {
  const [loginOpen, setLoginOpen] = useState(false);

  // toast is used to display user facing
  // error messages through the app
  const notificationOpts: ToastOptions = {
    position: "bottom-center",
    autoClose: 2500,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined
  }

  const notify = (message: string) => toast.error(message, notificationOpts);
  const success = (message: string) => toast.success(message, notificationOpts);

  const promptLogin = () => {
    setLoginOpen(true);
  }

  const closeLogin = () => {
    setLoginOpen(false);
  }

  const modalStyle = {
    content : {
      top          : '50%',
      left         : '50%',
      right        : 'auto',
      height       : 'min-content',
      width        : '20rem',
      bottom       : 'auto',
      marginRight  : '-50%',
      transform    : 'translate(-50%, -50%)'
    }
  };

  return (
    <Router>
      <Header login={promptLogin}/>
      <Modal
        isOpen={loginOpen}
        onRequestClose={closeLogin}
        style={modalStyle}
        contentLabel="Log In"
      >
        <SignUp close={closeLogin} notify={notify}/>
      </Modal>
      <main>
        <Switch>
          <Route path='/favorites'>
            <FavoritesPage notify={notify}/>
          </Route>
          <Route path='/'>
            <SearchPage notify={notify} success={success}/>
          </Route>
        </Switch>
        <ToastContainer />
      </main>
    </Router>
  );
}

export default App;
