import Image from "next/image";
import axios from "axios";
import {toast} from 'react-toastify'

import { formatearDinero } from "../helpers/index";


const Orden = ({ orden }) => {
  const completarOrden = async () => {
    try {
     await axios.post(`/api/ordenes/${orden.id}`);
     toast.success('Orden Lista')
    } catch (error) {
        toast.error('Hubo un error')
    }
  };
  return (
    <div className="border p-10 space-y-5 ">
      <h3 className="text-2xl  font-bold">Orden: {orden.id}</h3>
      <p className="text-lg my-10 font-bold">Cliente: {orden.nombre}</p>

      <div className="">
        {orden.pedido.map((pedido) => (
          <div
            className="py-3 flex border-b last-of-type:border-0 items-center"
            key={pedido.id}
          >
            <div className="w-32">
              <Image
                width={400}
                height={500}
                src={`/assets/img/${pedido.imagen}.jpg`}
                alt={pedido.nombre}
              />
            </div>
            <div className="p-5 space-y-2">
              <h4 className="text-xl font-bold text-amber-500">
                {pedido.nombre}
              </h4>
              <p className="text-lg font-bold">Cantidad: {pedido.cantidad}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="md:flex md:items-center md:justify-between my-10">
        <p className="mt-5 font-black text-4xl text-amber-500">
          Total a pagar: {formatearDinero(orden.total)}
        </p>
        <button
          type="button"
          onClick={completarOrden}
          className="bg-indigo-600 hover:bg-indigo-800 text-white mt-5 md:mt-0 py-3 px-10 uppercase font-bold rounded-lg"
        >
          Completar orden
        </button>
      </div>
    </div>
  );
};

export default Orden;
