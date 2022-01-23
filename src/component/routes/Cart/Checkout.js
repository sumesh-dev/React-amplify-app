import { toast } from 'react-toastify';
import { createOrder, updateOrder } from '../../../service/PaymentService';

const CheckOut = async (totalAmount, user) => {
    // console.log(totalAmount)
    // console.log(user)
    // const navigate = useNavigate()
    createOrder(totalAmount)
        .then((response) => {
            console.log(response);
            if (response.status === 200) {
                const options = {
                    key: "rzp_test_XZmE9htlGHPrr3",
                    amount: response.data.amount,
                    currency: response.data.currency,
                    name: "ecommerce",
                    description: response.data.notes,
                    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpjfH5ZEAnfm2zufUDfd3SWciPuyN2jiK5EA&usqp=CAU",
                    order_id: response.data.id,
                    handler: async function (response) {
                        console.log(response);
                        const data = {
                            order_id: response.razorpay_order_id,
                            payment_id: response.razorpay_payment_id,
                            status: "sucess"
                        }
                        console.log(data)
                        updateOrder(data)
                            .then((response) => {
                                console.log(response)
                                toast.success("payment successful")
                                return true
                            })
                            .catch((error) => {
                                console.log(error)
                                toast.error("your payment is successful. it will soon available in my orders")
                                return true
                            })
                    },
                    prefill: {
                        name: user.firstName,
                        email: user.email,
                        contact: "9999999999",
                    },
                    notes: {
                        address: "Razorpay Corporate Office",
                    },
                    theme: {
                        color: "#3399cc",
                    },
                }
                const paymentObject = new window.Razorpay(options);
                paymentObject.open();
            }
        })
}

export default CheckOut;