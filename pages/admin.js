import AdminLayout from '../layout/AdminLayout'
import useSWR from 'swr'
import axios from 'axios'
import Orden from '../components/Orden'

export default function Admin(){
    const fetcher = ()=> axios.get('/api/ordenes').then(datos => datos.data)
    //TODO: Cambiar el refreshInterval a una funcion que mejor actualice el state porque esta manera hace muchas peticiones
    const {data, error,isLoading}= useSWR('/api/ordenes',fetcher,{
        refreshInterval: 5000
    })
    // console.log(data)
    return(
        <>
            <AdminLayout pagina={'Admin'} >
            <h1 className="text-4xl font-black">Panel de administración</h1>
            <p className="text-2xl my-10">Administra las órdenes</p>

            {
            data && data.length ? (data.map((orden)=>(
                <Orden key={orden.id} orden={orden}/>
            ))) :(<p>No hay ordenes pendientes</p>)
            }

            </AdminLayout>
        </>
    )
}