import React, { createContext, useContext, useState, useEffect } from 'react';
import { products as initialProducts } from '../data/products';

const AdminContext = createContext();

export const useAdmin = () => useContext(AdminContext);

export const AdminProvider = ({ children }) => {
    // Mock Data for Orders
    const [orders, setOrders] = useState([
        {
            id: 'ORD-1001',
            customer: 'John Doe',
            date: '2023-10-25',
            status: 'Delivered',
            total: 120,
            paymentMethod: 'Online Payment',
            items: 2
        },
        {
            id: 'ORD-1002',
            customer: 'Jane Smith',
            date: '2023-10-26',
            status: 'Shipped',
            total: 85,
            paymentMethod: 'Cash on Delivery',
            items: 1
        },
        {
            id: 'ORD-1003',
            customer: 'Alice Johnson',
            date: '2023-10-27',
            status: 'Processing',
            total: 210,
            paymentMethod: 'Online Payment',
            items: 4
        },
        {
            id: 'ORD-1004',
            customer: 'Bob Brown',
            date: '2023-10-28',
            status: 'Pending',
            total: 50,
            paymentMethod: 'Cash on Delivery',
            items: 1
        }
    ]);

    // Mock Data for Products (using state so we can add/edit)
    const [products, setProducts] = useState(initialProducts || [
        { id: 1, name: 'Cyber Ninja', price: 120, category: 'Action Figures', stock: 15 },
        { id: 2, name: 'Neon Hoodie', price: 85, category: 'Apparel', stock: 40 },
        { id: 3, name: 'Mecha Sword', price: 250, category: 'Swords', stock: 5 },
    ]);

    // Actions
    const updateOrderStatus = (orderId, newStatus) => {
        setOrders(prev => prev.map(order =>
            order.id === orderId ? { ...order, status: newStatus } : order
        ));
    };

    const addProduct = (product) => {
        const newProduct = { ...product, id: Date.now() };
        setProducts(prev => [...prev, newProduct]);
    };

    const deleteProduct = (productId) => {
        setProducts(prev => prev.filter(p => p.id !== productId));
    };

    const updateProduct = (productId, updatedData) => {
        setProducts(prev => prev.map(p =>
            p.id === productId ? { ...p, ...updatedData } : p
        ));
    };

    const getStats = () => {
        const totalOrders = orders.length;
        const totalRevenue = orders.reduce((acc, order) => acc + order.total, 0);
        const pendingOrders = orders.filter(o => o.status === 'Pending').length;
        const totalProducts = products.length;

        return { totalOrders, totalRevenue, pendingOrders, totalProducts };
    };

    return (
        <AdminContext.Provider value={{
            orders,
            products,
            updateOrderStatus,
            addProduct,
            deleteProduct,
            updateProduct,
            getStats
        }}>
            {children}
        </AdminContext.Provider>
    );
};
