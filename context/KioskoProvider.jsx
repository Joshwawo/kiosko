import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const kiskoContext = createContext();

const KioskoProvider = ({ children }) => {
  const [categorias, setCategorias] = useState([]);
  const [categoriaActual, setCategoriaActual] = useState({});
  const [producto, setProducto] = useState({});
  const [modal, setModal] = useState(false);
  const [pedido, setPedido] = useState([]);
  const [nombre, setNombre] = useState("");
  const [total, setTotal] = useState(0);
  // const [paso, setPaso] = useState(1);

  const router = useRouter();

  const obtenerCategorias = async () => {
    try {
      const url = `/api/categorias`;
      const { data } = await axios.get(url);
      setCategorias(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    obtenerCategorias();
  }, []);

  useEffect(() => {
    setCategoriaActual(categorias[0]);
  }, [categorias]);
  useEffect(() => {
    const nuevoTotal = pedido.reduce(
      (total, producto) => producto.precio * producto.cantidad + total,
      0
    );

    setTotal(nuevoTotal);
  }, [pedido]);

  const handleClickCategoria = (id) => {
    const categoria = categorias.filter((cat) => cat.id === id);
    setCategoriaActual(categoria[0]);
    router.push("/");
  };

  const handleSetProducto = (producto) => {
    setProducto(producto);
  };
  const handleChangeModal = () => {
    setModal(!modal);
  };

  //Aqui, quita imagen y categoriaId, y hace una copia de productos sin imgen y categoria
  const handleAgregarPedido = ({ categoriaId, ...producto }) => {
    // console.log(producto)
    //Este pedido es el del state y va a verificar con el que va entrando
    if (pedido.some((productoState) => productoState.id === producto.id)) {
      //Actualizar la cantidad
      const pedidoActualiado = pedido.map((productoState) =>
        productoState.id === producto.id ? producto : productoState
      );
      setPedido(pedidoActualiado);
      toast.info("Pedido Actualizado Correctamente");
    } else {
      // console.log("El producto no existe");
      setPedido([...pedido, producto]);
      toast.success("Agregado al Pedido");
    }

    setModal(false);
  };

  const handleEditarCantidad = (id) => {
    const productoActualizar = pedido.filter((producto) => producto.id === id);
    setProducto(productoActualizar[0]);
    setModal(!modal);
  };
  const handleEliminarProducto = (id) => {
    const pedidoActualizado = pedido.filter((producto) => producto.id !== id);
    setPedido(pedidoActualizado);
  };

  const colocarOrden = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/api/ordenes", {
        pedido,
        nombre,
        total,
        fecha: Date.now().toString(),
      });

      setCategoriaActual(categorias[0]);
      setPedido([]);
      setNombre("");
      setTotal(0);
      toast.success("Pedido Realizado Correctamente")
      setTimeout(() => {
        router.push("/")
        
      }, 3000);

      //Resetear la app
    } catch (error) {
      console.log(error);
    }
  };

  // const handleChangePaso = (paso) => {
  //   setPaso(paso);

  // };

  return (
    <kiskoContext.Provider
      value={{
        categorias,
        handleClickCategoria,
        producto,
        categoriaActual,
        handleSetProducto,
        modal,
        handleChangeModal,
        handleAgregarPedido,
        pedido,
        handleEditarCantidad,
        handleEliminarProducto,
        nombre,
        setNombre,
        colocarOrden,
        total,
      }}
    >
      {children}
    </kiskoContext.Provider>
  );
};

export { KioskoProvider };

export default kiskoContext;
