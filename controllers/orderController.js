import Order from "../models/orderModel.js";



export const createOrder = async (req, res) => {

    let order = new Order({
        userid: req.body.userid,
        orderid: req.body.orderId,
        products: req.body.products,
        orderdate: req.body.Orderdate,
        shipaddress: req.body.Shipaddress,
        billaddress: req.body.billaddress,
        total: req.body.total,
    })

    order = await order.save();

    if (!order)
        return res.status(500).send('The order cannot be created')

    res.send(order);

}



export const getOrdersByUserId = async (req, res) => {
    const user = req.params.id;

    try {
        // Find all orders for the user
        const orders = await Order.find({ userid: user });

        if (orders.length === 0) {
            return res.status(404).json({ success: false, message: 'No orders found for this user.' });
        }

        return res.json(orders);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};


export const getOrdersByorderId = async (req, res) => {
    const orderid = req.params.id;

    try {
        const orders = await Order.find({ orderid: orderid });

        if (orders.length === 0) {
            return res.status(404).json({ success: false, message: 'No orders found for this user.' });
        }

        return res.json(orders);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};


export const getallOrders = async (req, res) => {

    try {
        // Find all orders for the user
        const orders = await Order.find({});

        if (orders.length === 0) {
            return res.status(404).json({ success: false, message: 'No orders found for this user.' });
        }
        return res.json(orders);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

export const updatestatus = async (req, res) => {
    try {
      const { status } = req.body;
      const { id } = req.params;
      const updatedOrder = await Order.findOneAndUpdate(
        { orderid: id }, // Finding the order by its orderid
        { status: status }, // Updating the status
        { new: true } // To return the updated document
    );
      res.status(200).send({
        success: true,
        messsage: "Category status Successfully"
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        error,
        message: "Error while updating status",
      });
    }
  };