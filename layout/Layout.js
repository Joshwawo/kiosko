import Head from "next/head";
import Sidebar from "../components/Sidebar";
import Modal from "react-modal";
import useKisko from "../hooks/useKiosko";
import ModalProducto from "../components/ModalProducto";
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Pasos from "../components/Pasos";

export const Layout = ({ children, pagina }) => {
  const { modal } = useKisko();
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  Modal.setAppElement("#__next");

  return (
    <>
      <Head>
        <title>{`Menu - ${pagina}`}</title>
        <meta name="description" content="Kiosko Cafetería" />
      </Head>
      <div className="md:flex">
        <aside className="md:w-4/12 xl:w-1/4 2xl:w-1/5">
          <Sidebar />
        </aside>
        <main className="md:w-8/12 xl:w-3/4 2xl:w-4/5 h-screen overflow-y-scroll">
          <Pasos/>
          <div className="p-10 ">{children}</div>
        </main>
      </div>
      {" "}
      {modal && (
        <Modal isOpen={modal} style={customStyles}>
         <ModalProducto/>
        </Modal>
      )}

      <ToastContainer/>
    </>
  );
};

// {modal && (<Modal isOpen={modal} style={customStyles}>
//   <h1>modal...</h1>
// </Modal>) }
