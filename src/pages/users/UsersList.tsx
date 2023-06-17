import useSwr from 'swr';
import fetcher from "@/utils/fetcher";
import { ListUserModel } from '@/types/app';
import { toast } from 'react-toastify';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import Card from '@mui/material/Card';
import * as dayjs from 'dayjs'
import { Link } from 'react-router-dom';
import { dataGridDataSorter } from '@/utils/dataSorter';
import axiosInstance from '@/config/axios';
import { AxiosError } from 'axios';
import usersListStyles from "./usersList.module.scss"

const DataCellRenderer = ({ value }: GridRenderCellParams) => <span>{ dayjs(value).format('DD-MM-YYYY') }</span>

interface ActionsRendererProps {
  deleteFunc: () => Promise<void>
}
const ActionsRenderer = ({ id, deleteFunc }: GridRenderCellParams & ActionsRendererProps) => (
    <div className={usersListStyles.actions}>
      <Link to={`${id}`} className='clean btn variant warning'>
        Edit
      </Link>
      <button type='button' className='clean btn variant error' onClick={deleteFunc}>
        Delete
      </button>
    </div>
  )

const UsersList = () => {
  const { data, mutate } = useSwr<ListUserModel[] | null>('users', fetcher)
  const handleDelete = async (id: string | number) => {
    try {
      await axiosInstance.delete(`users/${id}`);
      const { data: listData } = await axiosInstance.get<ListUserModel[] | null>('users')
      mutate(listData)
      toast.success("User deleted successfully", { autoClose: 5000 })
    }
    catch (e) {
      const message = (e as AxiosError).response?.data as string | undefined
      toast.error(message || "User could not be deleted, try again", { autoClose: 5000 })
    }
  }

  const columns: GridColDef[] = [
    { field: '_id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', flex: 1},
    { field: 'email', headerName: 'E-mail', flex: 2},
    { field: 'createdAt', headerName: 'Created At', width: 200, renderCell: DataCellRenderer, sortComparator: dataGridDataSorter },
    { field: 'actions', headerName: 'Actions', renderCell: (params) => (<ActionsRenderer {...params} deleteFunc={() => handleDelete(params.id)} />), minWidth: 170 }
  ]
  // eslint-disable-next-line no-underscore-dangle
  const handleRowIdGetter = (item: ListUserModel) => item._id;
  return (
    <div>
      <div className="header-with-button">
        <h1 className={usersListStyles.usersListHeader}>List of Users</h1>
        <Link to="create" className='btn clean variant primary' type='button'>Add User</Link>
      </div>
      { data && 
        <Card variant="outlined">
            <DataGrid 
              columns={columns} rows={data} 
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
    </div>
  )
}

export default UsersList