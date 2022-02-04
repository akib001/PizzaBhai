import { Fragment } from "react";
import OrderList from "./OrderList";
import OrderSummary from "./OrderSummary";

const Admin = () => {
    return (
        <Fragment>
        <OrderSummary/>
        <OrderList/>
        </Fragment>
    );
}

export default Admin;