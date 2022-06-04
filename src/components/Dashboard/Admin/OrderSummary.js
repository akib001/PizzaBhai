import classes from './OrderSummary.module.css';
import { useSelector } from 'react-redux';

const OrderSummary = () => {
    const totalOrderedPrice = useSelector(state => state.auth.totalOrderedPrice);
    const totalOrderedQuantity = useSelector(state => state.auth.totalOrderedAmount);

    return <section className={classes.summary}>
        <h2>Total Ordered Price: {totalOrderedPrice}</h2>
        <h2>Total Amount Ordered: {totalOrderedQuantity}</h2>   
    </section>
}

export default OrderSummary;