import React from "react";
import Image from "next/image";
import { formatearDinero } from "../helpers/index";
import { SvgEditar, SvgEliminar } from "./Svg";
import useKiosko from "../hooks/useKiosko";

const ResumenProducto = ({ producto }) => {
  const { handleEditarCantidad,handleEliminarProducto } = useKiosko();

  return (
    <div className="shadow p-5 mb-3 flex gap-10 items-center">
      <div className="md:w-1/6">
        <Image
          width={300}
          height={400}
          src={`/assets/img/${producto.imagen}.jpg`}
          alt={`Imagen del producto ${producto.nombre}`}
        />
      </div>
      <div className="md:w-4/6">
        <p className="text-2xl font-bold">{producto.nombre}</p>
        <p className="text-xl font-semibold mt-2">
          Cantidad: {producto.cantidad}
        </p>
        <p className="text-xl text-amber-500 font-semibold mt-2">
          Precio: {formatearDinero(producto.precio)}
        </p>
        <p className="text-sm text-gray-500  mt-2">
          Subtotal: {formatearDinero(producto.precio * producto.cantidad)}
        </p>
      </div>
      <div className="1">
        <button
          type="button"
          onClick={()=>handleEditarCantidad(producto.id)}
          className="bg-sky-700 flex gap-2 px-5 py-2 text-white rounded-md font-bold uppercase shadow-md w-full "
        >
          <SvgEditar />
          Editar
        </button>
        <button
          type="button"
          onClick={()=>handleEliminarProducto(producto.id)}
          className="bg-red-700 flex gap-2 px-5 py-2 text-white rounded-md font-bold uppercase shadow-md w-full mt-2 "
        >
          <SvgEliminar />
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default ResumenProducto;
