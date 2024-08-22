const orderHistory = [
    {
        id: '1',
        productImage: '/path/to/image3.jpg',
        productName: 'Product 3',
        quantity: 1,
        price: 79.99,
        orderDate: '2024-08-10',
        status: 'Completed',
    },
    {
        id: '2',
        productImage: '/path/to/image4.jpg',
        productName: 'Product 4',
        quantity: 3,
        price: 59.99,
        orderDate: '2024-07-22',
        status: 'Completed',
    },
    // Add more orders as needed
];

const OrderHistory = () => {
    return (
        <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Order History</h3>
            <div className="space-y-4">
                {orderHistory.map((order) => (
                    <div key={order.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg shadow-sm">
                        <img src={order.productImage} alt={order.productName} className="w-16 h-16 object-cover rounded-md" />
                        <div className="flex-1">
                            <h4 className="text-lg font-semibold text-gray-900">{order.productName}</h4>
                            <p className="text-sm text-gray-600">Quantity: {order.quantity}</p>
                            <p className="text-sm text-gray-600">Price: ${order.price.toFixed(2)}</p>
                            <p className="text-sm text-gray-600">Ordered on: {order.orderDate}</p>
                        </div>
                        <div className="text-right">
                            <span className="px-3 py-1 rounded-full bg-green-300 text-green-800 text-sm">
                                {order.status}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrderHistory;
