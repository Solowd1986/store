import React, { Component } from "react";
import styles from "./order_item.module.scss";

import FormInputCounter from "@components/Pages/Order/OrderForm/FormComponents/FormInputCounter/FormInputCounter";
import CancelButton from "@components/Pages/Order/OrderForm/FormComponents/CancelButton/CancelButton";

import * as cartActions from "@redux/entities/cart/actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";


const OrderItem = ({item, item: { img_alt: alt, img }, changeAmountOfProduct, removeItemFromCart}:any) => {

    const deleteFromOrder = () => removeItemFromCart(item);

    const changeAmount = (quantity:any) => {
        const { id, title } = item;
        changeAmountOfProduct(id, title, quantity);
    };

    const discount = item.discount ? item.price - (item.price * 10) / 100 : item.price;
    const price = new Intl.NumberFormat().format(discount * item.quantity) + " р.";

    return (
        <div className={styles.info}>
            <img width={82} height={82} className={styles.img_sm} src={img.md} alt={alt} />
            <div className={styles.info_inner_wrapper}>
                <p className={styles.product_title}>
                    <span>{item.title}</span>
                    <span>({item.color || item.specifications.color})</span>
                </p>

                <FormInputCounter
                    classList={styles.counter_wrapper}
                    maxValue={item.rest}
                    initialValue={item.quantity}
                    getProcessedAmount={changeAmount}
                />
            </div>
            <span className={styles.price__sm}>{price}</span>
            <CancelButton classList={styles.delete} handler={deleteFromOrder}/>
        </div>
    );
};






// class OrderItem1 extends Component {
//     static propTypes = {
//         changeAmountOfProduct: PropTypes.func.isRequired,
//         removeItemFromCart: PropTypes.func.isRequired,
//     };
//
//     deleteFromOrder = () => {
//         this.props.removeItemFromCart(this.props.item);
//     };
//
//     changeAmount = (quantity) => {
//         const { id, title } = this.props.item;
//         this.props.changeAmountOfProduct(id, title, quantity);
//     };
//
//     render() {
//         const { item, item: { img_alt: alt, img } } = this.props;
//         const discount = item.discount ? item.price - (item.price * 10) / 100 : item.price;
//         const price = new Intl.NumberFormat().format(discount * item.quantity) + " р.";
//
//         return (
//             <div className={styles.info}>
//                 <img width={82} height={82} className={styles.img_sm} src={img.md} alt={alt} />
//                 <div className={styles.info_inner_wrapper}>
//                     <p className={styles.product_title}>
//                         <span>{item.title}</span>
//                         <span>({item.color || item.specifications.color})</span>
//                     </p>
//
//                     <FormInputCounter
//                         classList={styles.counter_wrapper}
//                         maxValue={this.props.item.rest}
//                         initialValue={this.props.item.quantity}
//                         getProcessedAmount={this.changeAmount}
//                     />
//                 </div>
//                 <span className={styles.price__sm}>{price}</span>
//                 <CancelButton classList={styles.delete} handler={this.deleteFromOrder}/>
//             </div>
//         );
//     }
// }


const mapDispatchToProps = (dispatch:any) => (bindActionCreators(cartActions, dispatch));
export default connect(null, mapDispatchToProps)(OrderItem);
