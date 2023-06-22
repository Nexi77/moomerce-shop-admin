import { OrderListModel } from "@/types/app";
import useSwr from 'swr';
import fetcher from "@/utils/fetcher";
import { Link, useParams } from "react-router-dom";
import { Alert, Card, Chip } from "@mui/material";
import formStyles from '@/assets/styles/form.module.scss'
import listStyles from '@/assets/styles/list.module.scss'

const OrderDetails = () => {
    const { id } = useParams<string>();
    const { data } = useSwr<OrderListModel | null>(`orders/${id}`, fetcher);
    return (
        <div style={{ maxWidth: '960px' }}>
            { data && <Card>

                <div className="header-with-button">
                    <h1 className={listStyles.usersListHeader}>Order details</h1>
                    <Link to="/orders" className='btn clean variant primary' type='button'>Back to list</Link>
                </div>
                <div className={formStyles.previewWrapper}>
                    <div>
                        <span className={formStyles.previewLabel}>Order ID:</span>
                        <span className={formStyles.previewValue}>{ data._id }</span>
                    </div>
                    <div>
                        <span className={formStyles.previewLabel}>Amount:</span>
                        <span className={formStyles.previewValue}>${ data.amount }</span>
                    </div>
                    <div>
                        <span className={formStyles.previewLabel}>Status:</span>
                        <span className={formStyles.previewValue}><Chip color={ data.status === 'pending' ? 'warning' : 'success'} label={ data.status }/></span>
                    </div>
                    <div className={formStyles.columnData}>
                        <span className={formStyles.previewLabel} style={{ alignSelf: 'flex-start' }}>Products:</span>
                        <div className={formStyles.productsList}>
                            { data.products.map(product => (
                            <div key={product.productId}>
                                <span>ProductId: { product.productId }</span>
                                <span>Quantity: { product.quantity } </span>
                            </div>))}
                        </div>
                    </div>
                    <div>
                        <span className={formStyles.previewLabel}>Adress:</span>
                        <div className={formStyles.previewAddress}>
                            <p>{ data.address.street }, { data.address.houseNumber }{ data.address.appartmentNumber ? `/${data.address.appartmentNumber}` : ``}</p>
                            <p>{ data.address.postalCode }, { data.address.city }</p>
                            <p>{ data.address.country }</p>
                        </div>
                    </div>
                </div>
            </Card> }
            { (data === null) && <Alert severity='info'>No data found</Alert>}
            { (!data) && <Alert severity='info'>Fetching data...</Alert>}
        </div>
        
    )

}

export default OrderDetails;