import { Layout } from "../layout/Layout";
import useKiosko from "../hooks/useKiosko";
import ResumenProducto from "../components/ResumenProducto";
export default function Resumen() {
  const {pedido} = useKiosko();
  return (
    <Layout pagina={"Resumen"}>
      <h1 className="text-4xl font-black">Resumen</h1>
      <p className="text-2xl my-10">Revisa tu Pedido</p>
      {
        pedido.length === 0 ? (<p>No hay nada en tu pedido</p>) 
        : (<div>{pedido.map((producto)=>(
            <ResumenProducto key={producto.id} producto={producto}/>
        ))}</div>)
      }
    </Layout>
  );
}
