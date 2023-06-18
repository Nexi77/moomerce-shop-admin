import useSwr from 'swr';
import fetcher from "@/utils/fetcher";
import { ProductListModel } from '@/types/app';
import { toast } from 'react-toastify';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import Card from '@mui/material/Card';
import { Link } from 'react-router-dom';
import axiosInstance from '@/config/axios';
import { AxiosError } from 'axios';
import listStyles from "@/assets/styles/list.module.scss"
import { Alert } from '@mui/material';

interface ActionsRendererProps {
  deleteFunc: () => Promise<void>
}

const ActionsRenderer = ({ id, deleteFunc }: GridRenderCellParams & ActionsRendererProps) => (
    <div className={listStyles.actions}>
      <Link to={`${id}`} className='clean btn variant warning'>
        Edit
      </Link>
      <button type='button' className='clean btn variant error' onClick={deleteFunc}>
        Delete
      </button>
    </div>
  )

const ProductsList = () => {
  const { data, mutate } = useSwr<ProductListModel[] | null>('products', fetcher)
  const handleDelete = async (id: string | number) => {
    try {
      await axiosInstance.delete(`products/${id}`);
      const { data: listData } = await axiosInstance.get<ProductListModel[] | null>('products')
      mutate(listData)
      toast.success("Product deleted successfully", { autoClose: 5000 })
    }
    catch (e) {
      const message = (e as AxiosError).response?.data as string | undefined
      toast.error(message || "Product could not be deleted, try again", { autoClose: 5000 })
    }
  }

  const columns: GridColDef[] = [
    { field: '_id', headerName: 'ID', width: 90 },
    { field: 'img', headerName: 'Image', width: 200, renderCell: (params) => <img src={params.value} alt="Product for sale" className={listStyles.image} />, sortable: false },
    { field: 'title', headerName: 'Title', flex: 1},
    { field: 'categories', headerName: 'Categories', flex: 2, sortable: false},
    { field: 'color', headerName: 'Color', flex: 1, sortable: false},
    { field: 'price', headerName: 'Price', flex: 1},
    { field: 'size', headerName: 'Size', flex: 1, sortable: false},
    { field: 'actions', headerName: 'Actions', renderCell: (params) => (<ActionsRenderer {...params} deleteFunc={() => handleDelete(params.id)} />), minWidth: 170 }
  ]
  const handleRowIdGetter = (item: ProductListModel) => item._id;
  return (
    <div>
      <div className="header-with-button">
        <h1 className={listStyles.usersListHeader}>List of Products</h1>
        <Link to="create" className='btn clean variant primary' type='button'>Add Product</Link>
      </div>
      { data && data.length > 0 && 
        <Card variant="outlined">
            <DataGrid 
              columns={columns} 
              rows={data} 
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 10
                  }
                }
              }} 
              pageSizeOptions={[5,10, 30]} 
              getRowId={handleRowIdGetter} />
        </Card>
      }
      { (!data || data.length <= 0) && <Alert severity='info'>No products found</Alert>}
    </div>
  )
}

export default ProductsList