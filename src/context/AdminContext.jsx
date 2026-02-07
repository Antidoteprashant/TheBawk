import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabase';

const AdminContext = createContext();

export const useAdmin = () => useContext(AdminContext);

export const AdminProvider = ({ children }) => {
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch Data
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const { data: productData, error: productError } = await supabase
                .from('products')
                .select('*')
                .order('created_at', { ascending: false });

            if (productError) throw productError;
            setProducts(productData || []);

            const { data: orderData, error: orderError } = await supabase
                .from('orders')
                .select('*')
                .order('created_at', { ascending: false });

            if (orderError) throw orderError;
            setOrders(orderData || []);

        } catch (error) {
            console.error("Error fetching data:", error.message);
        } finally {
            setLoading(false);
        }
    };

    // Actions
    const updateOrderStatus = async (orderId, newStatus) => {
        try {
            const { error } = await supabase
                .from('orders')
                .update({ status: newStatus })
                .eq('id', orderId);

            if (error) throw error;

            // Optimistic Update
            setOrders(prev => prev.map(order =>
                order.id === orderId ? { ...order, status: newStatus } : order
            ));
        } catch (error) {
            console.error("Error updating order:", error.message);
            alert("Failed to update status");
        }
    };

    const addProduct = async (product) => {
        try {
            // Remove ID if present to let DB handle it? key 'id' is optional here for now
            const { id, ...productData } = product;
            const { data, error } = await supabase
                .from('products')
                .insert([productData])
                .select();

            if (error) throw error;

            // Update State
            setProducts(prev => [data[0], ...prev]);
            return { success: true };
        } catch (error) {
            console.error("Error adding product:", error.message);
            return { success: false, error: error.message };
        }
    };

    const deleteProduct = async (productId) => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;

        try {
            const { error } = await supabase
                .from('products')
                .delete()
                .eq('id', productId);

            if (error) throw error;

            setProducts(prev => prev.filter(p => p.id !== productId));
        } catch (error) {
            console.error("Error deleting product:", error.message);
            alert("Failed to delete product");
        }
    };

    const updateProduct = async (productId, updatedData) => {
        try {
            const { error } = await supabase
                .from('products')
                .update(updatedData)
                .eq('id', productId);

            if (error) throw error;

            setProducts(prev => prev.map(p =>
                p.id === productId ? { ...p, ...updatedData } : p
            ));
            return { success: true };
        } catch (error) {
            console.error("Error updating product:", error.message);
            return { success: false, error: error.message };
        }
    };

    const getStats = () => {
        const totalOrders = orders.length;
        const totalRevenue = orders.reduce((acc, order) => acc + (parseFloat(order.total_amount) || 0), 0);
        const pendingOrders = orders.filter(o => o.status === 'Pending').length;
        const totalProducts = products.length;

        return { totalOrders, totalRevenue, pendingOrders, totalProducts };
    };

    return (
        <AdminContext.Provider value={{
            orders,
            products,
            loading,
            updateOrderStatus,
            addProduct,
            deleteProduct,
            updateProduct,
            getStats,
            refreshData: fetchData
        }}>
            {children}
        </AdminContext.Provider>
    );
};
