import { useRouter } from "next/router";
// import useKiosko from "../hooks/useKiosko";

const pasos = [
  { paso: 1, nombre: "Menú", url: "/" },
  { paso: 2, nombre: "Resumen", url: "/resumen" },
  { paso: 3, nombre: "Datos y Total", url: "/total" },
];

const Pasos = () => {
//   const { handleChangePaso } = useKiosko();
  const router = useRouter();

  //   const calcularProgreso = () => {
  //     const porcentaje = (paso / 3) * 100;
  //     return porcentaje;
  //   };
  const calcularProgreso = () => {
    let valor;

    if (router.pathname === "/") {
      valor = 2;
    } else if (router.pathname === "/resumen") {
      valor = 50;
    } else {
      valor = 100;
    }

    return valor;
  };

  return (
    <>
      <div className="flex  justify-between my-5">
        {pasos.map((paso) => (
          <button
            onClick={() => {
              router.push(paso.url);
              
            }}
            key={paso.paso}
            className="text-2xl font-bold "
          >
            {paso.nombre}
          </button>
        ))}
      </div>

      <div className="bg-gray-100 mb-10">
        <div
          className=" rounded-full bg-amber-500 text-xs leading-none h-2 text-center text-white w-10"
          style={{ width: `${calcularProgreso()}%` }}
        ></div>
      </div>
    </>
  );
};

export default Pasos;
