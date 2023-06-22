import axiosInstance from '@/config/axios';
import { OrderListModel, OrderProductModel } from '@/types/app';
import fetcher from '@/utils/fetcher';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { DataGrid, GridColDef, GridRenderCellParams, GridRowHeightParams } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import useSwr from 'swr';
import listStyles from '@/assets/styles/list.module.scss'
import { Alert, Card, Chip } from '@mui/material';


interface ActionsRendererProps {
    deleteFunc: () => Promise<void>
}

const ActionsRenderer = ({ id, deleteFunc }: GridRenderCellParams & ActionsRendererProps) => (
    <div className={listStyles.actions}>
      <Link to={`${id}`} className='clean btn variant warning'>
        View
      </Link>
      <button type='button' className='clean btn variant error' onClick={deleteFunc}>
        Delete
      </button>
    </div>
)

const ProductsRenderer = ({ value }: GridRenderCellParams): JSX.Element => {
    if(value.length){
        const mappedValue: JSX.Element = value.map((product: OrderProductModel) => (
            <div className={listStyles.arrayRender} key={product.productId}>
                <span>Id: { product.productId }</span>
                <span>Quantity: { product.quantity }</span>
            </div>
        ))
        return ( 
            <div className={listStyles.arrayWrapper}>
                { mappedValue }
            </div> 
        )
    }
    return <span />
}

const AddressRenderer = ({ value }: GridRenderCellParams) => (
        <div className={listStyles.addressCell}>
            <span>Street: { value.street }</span>
            <span>House/Apartment nr: { value.houseNumber }{ value.appartmentNumber ? `/ ${value.appartmentNumber}` : ``}</span>
            <span>Postal code: { value.postalCode }</span>
            <span>City: { value.city }</span>
            <span>Country: { value.country }</span>
        </div>
    )

const OrdersList = () => {
    const { data, mutate } = useSwr<OrderListModel[]| null>('orders', fetcher);
    const handleDelete = async (id: string | number) => {
        try {
          await axiosInstance.delete(`orders/${id}`);
          const { data: listData } = await axiosInstance.get<OrderListModel[] | null>('orders')
          mutate(listData)
          toast.success("Order deleted successfully", { autoClose: 5000 })
        }
        catch (e) {
          const message = (e as AxiosError).response?.data as string | undefined
          toast.error(message || "Order could not be deleted, try again", { autoClose: 5000 })
        }
    }
    const getRowHeight = (params: GridRowHeightParams) => {
        const { model: { products } } = params;
        return Math.max(150, products.length * 41.5);
    }
    const columns: GridColDef[] = [
        { field: '_id', headerName: 'ID', width: 90 },
        { field: 'products', headerName: 'Products', flex: 1, renderCell: (params) => (<ProductsRenderer {...params} />), sortable: false },
        { field: 'amount', headerName: 'Amount', flex: 1, renderCell: (params) => (<span>${params.value}</span>)},
        { field: 'address', headerName: 'Address', flex: 1, renderCell: (params) => (<AddressRenderer {...params } />), sortable: false },
        { field: 'status', headerName: 'Status', width: 120, renderCell: (params) => (<Chip color={ params.value === 'pending' ? 'warning' : 'success'} label={ params.value }/>), sortable: false },
        { field: 'actions', headerName: 'Actions', renderCell: (params) => (<ActionsRenderer {...params} deleteFunc={() => handleDelete(params.id)} />), minWidth: 170, sortable: false }
    ]
    const handleRowIdGetter = (item: OrderListModel) => item._id;

    return (
        <div>
        <div className="header-with-button">
          <h1 className={listStyles.usersListHeader}>List of Orders</h1>
        </div>
        { data  && data.length > 0 && 
          <Card variant="outlined">
              <DataGrid 
                columns={columns} rows={data} 
                getRowHeight={getRowHeight}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 5
                    }
                  }
                }} 
                pageSizeOptions={[2,5,10]} 
                getRowId={handleRowIdGetter} />
          </Card>
        }
        { (!data || data.length <= 0) && <Alert severity='info'>No orders found</Alert>}
      </div>
    )
}

export default OrdersList;