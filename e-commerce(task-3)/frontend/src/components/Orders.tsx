import { Route, Routes, NavLink } from 'react-router-dom';
import PendingOrders from './PendingOrders';
import OrderHistory from './OrderHistory';

const Orders = () => {
    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <h2 className="text-3xl font-extrabold text-gray-800 mb-6">My Orders</h2>
            <nav className="flex space-x-4 mb-6">
                <NavLink
                    to="/orders/pending"
                    className={({ isActive }) =>
                        `px-4 py-2 rounded-md ${isActive ? 'bg-blue-600 text-white' : 'bg-white text-gray-800 border'}`
                    }
                >
                    Pending Orders
                </NavLink>
                <NavLink
                    to="/orders/history"
                    className={({ isActive }) =>
                        `px-4 py-2 rounded-md ${isActive ? 'bg-blue-600 text-white' : 'bg-white text-gray-800 border'}`
                    }
                >
                    Order History
                </NavLink>
            </nav>
            <div className="bg-white p-6 rounded-md shadow-lg">
                <Routes>
                    <Route path="pending" element={<PendingOrders />} />
                    <Route path="history" element={<OrderHistory />} />
                </Routes>
            </div>
        </div>
    );
};

export default Orders;
