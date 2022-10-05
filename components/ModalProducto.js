import Image from "next/image";
import { useState, useEffect } from "react";
import useKiosko from "../hooks/useKiosko";
import { formatearDinero } from "../helpers";
import { SvgMenos, SvgPlus, SvgCerrar } from "./Svg";

const ModalProducto = () => {
  const { producto, handleChangeModal, handleAgregarPedido, pedido } =
    useKiosko();
  const { imagen, nombre, precio } = producto;
  const [cantidad, setCantidad] = useState(1);
  const [edicion, setEdicion] = useState(false);

  //Comprobar si el modal actual esta en el pedido
  //   if (pedido.some((pedidoState) => pedidoState.id === producto.id)) {
  //     console.log("Si Existe");
  //   } else {
  //     console.log("No existe");
  //   }

  useEffect(() => {
    if (pedido.some((pedidoState) => pedidoState.id === producto.id)) {
      const productoEditado = pedido.find(
        (pedidoState) => pedidoState.id === producto.id
      );
      setEdicion(true);
      setCantidad(productoEditado.cantidad);
    }
  }, [producto, pedido]);
  return (
    <div className="md:flex gap-10">
      <div className="md:w-1/3">
        <Image
          width={300}
          height={400}
          src={`/assets/img/${imagen}.jpg`}
          alt={`Imagen del producto ${nombre}`}
        />
      </div>
      <div className="md:w-2/3">
        <div className="flex justify-end">
          <button onClick={handleChangeModal}>
            <SvgCerrar />
          </button>
        </div>
        <h1 className="text-3xl font-bold mt-5">{nombre}</h1>
        <p className="mt-5 font-black text-2xl text-amber-500">
          {formatearDinero(precio)}
        </p>
        <div className="botones flex gap-4 ">
          <button
            type="button"
            onClick={() => {
              if (cantidad <= 1) return;
              setCantidad(cantidad - 1);
            }}
            className=""
          >
            <SvgMenos />
          </button>
          <p className="text-3xl ">{cantidad}</p>
          <button
            type="button"
            onClick={() => {
              if (cantidad >= 5) return;
              setCantidad(cantidad + 1);
            }}
          >
            <SvgPlus />
          </button>
        </div>
        <button
          type="button"
          onClick={() => handleAgregarPedido({ ...producto, cantidad })}
          className="bg-indigo-600 hover:bg-indigo-800 px-5 py-2 mt-5 text-white font-bold uppercase rounded-md"
        >
          { edicion ? 'Guardar Cambios': 'Añadir al pedido'}
        </button>
      </div>
    </div>
  );
};

export default ModalProducto;
