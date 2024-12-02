// components/RecentOrders.js
import React from "react";
import {Table, Card, Badge} from "react-bootstrap";
import {FaEdit, FaEye, FaTrash} from "react-icons/fa"; // Icons for Actions

const RecentOrders = () => {
    return (
        <Card className="shadow-sm rounded custom-card">
            <Card.Body>
                <h4>Recent Orders</h4>
                <Table hover responsive className="custom-table">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Product Name</th>
                            <th>Category</th>
                            <th>Qty</th>
                            <th>Status</th>
                            <th>Order Date</th>
                            <th>Total Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>#5671</td>
                            <td>
                                <img src="/path-to-helmet-icon" alt="Helmet" className="product-icon" />
                                Helmet
                            </td>
                            <td>Bike</td>
                            <td>40</td>
                            <td>
                                <Badge bg="success">Completed</Badge>
                            </td>
                            <td>2024-08-24</td>
                            <td>$499.89</td>
                            <td>
                                <FaEye className="action-iconEye" /> <FaEdit className="action-iconEdit" />
                                <FaTrash className="action-iconTrash" />
                            </td>
                        </tr>
                        <tr>
                            <td>#7896</td>
                            <td>
                                <img src="/path-to-seatcover-icon" alt="Seat Cover" className="product-icon" />
                                Seat Cover
                            </td>
                            <td>Car</td>
                            <td>70</td>
                            <td>
                                <Badge bg="danger">Rejected</Badge>
                            </td>
                            <td>2024-08-24</td>
                            <td>$499.89</td>
                            <td>
                                <FaEye className="action-iconEye" /> <FaEdit className="action-iconEdit" />
                                <FaTrash className="action-iconTrash" />
                            </td>
                        </tr>
                        <tr>
                            <td>#5286</td>
                            <td>
                                <img src="/path-to-seatcover-icon" alt="Seat Cover" className="product-icon" />
                                Seat Cover
                            </td>
                            <td>Car</td>
                            <td>87</td>
                            <td>
                                <Badge bg="warning">Processed</Badge>
                            </td>
                            <td>2024-08-24</td>
                            <td>$499.89</td>
                            <td>
                                <FaEye className="action-iconEye" /> <FaEdit className="action-iconEdit" />
                                <FaTrash className="action-iconTrash" />
                            </td>
                        </tr>
                        {/* Add more rows as necessary */}
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    );
};

export default RecentOrders;
