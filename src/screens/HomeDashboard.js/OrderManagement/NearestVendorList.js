import React, {useContext, useEffect, useState} from "react";
import Sidebar from "../../../components/Atoms/Sidebar";
import Header from "../../../components/HOC/Header";
import {Table, Form, InputGroup, Button, Pagination, Badge, Card, Offcanvas} from "react-bootstrap";
import {AiOutlineSearch, AiFillEdit, AiFillDelete} from "react-icons/ai";
import dayjs from "dayjs";
import "../../../assets/Css/ProductList.css";
import {useLocation, useNavigate} from "react-router-dom";
import {FaEye, FaArrowLeft, FaArrowRight} from "react-icons/fa";
import {VendorContext} from "../../../context/VendorContext";
import ToastComponent from "../../../components/HOC/Toast";
const NearestVendorlist = () => {
    const {assignVendor, getNearestVendor, NearestVendor, toastMessage} = useContext(VendorContext);
    const navigate = useNavigate();
    const location = useLocation();
    const itemId = location.state?.itemId;
    const itemName = location.state?.itemName;
    const [ShowToast, setShowToast] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false); // Manage sidebar visibility on mobile

    const toggleSidebar = () => setShowSidebar(!showSidebar); // Function to toggle sidebar
    useEffect(() => {
        getNearestVendor(itemId);
    }, []);

    const handleAssignVendor = (vendorId, sellingPrice) => {
        assignVendor(itemId, vendorId, sellingPrice);
        setShowToast(true);

        setTimeout(() => {
            setShowToast(false);
        }, 5000); //
    };

    return (
        <div className="d-flex">
            <div className="d-none d-md-block">
                <Sidebar /> {/* Sidebar visible on large screens */}
            </div>

            {/* Offcanvas Sidebar for small screens */}
            <Offcanvas
                show={showSidebar}
                onHide={toggleSidebar}
                className="bg-dark text-white"
                style={{width: "250px"}}
            >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Menu</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Sidebar /> {/* Sidebar content */}
                </Offcanvas.Body>
            </Offcanvas>
            <div style={{flex: 1}}>
                <Header title={"Vendor Management"} toggleSidebar={toggleSidebar} />
                <ToastComponent
                    show={ShowToast}
                    type={"success"}
                    message={toastMessage}
                    onClose={() => setShowToast(false)}
                />
                <div className="m-4">
                    <h4>List Of Vendors ({itemName})</h4>
                </div>
                <Card className="shadow-sm rounded custom-card m-4">
                    <div className="p-4">
                        <Table bordered hover responsive className="align-middle">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email Id</th>
                                    <th>Phone Number</th>
                                    <th>Price</th>
                                    <th>Distance</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {NearestVendor.map((vendor, index) => (
                                    <tr key={vendor?.vendor_id}>
                                        <td>{index + 1}</td>
                                        <td>{vendor?.store_name}</td>
                                        <td>{vendor?.store_contact_email}</td>
                                        <td>{vendor?.store_contact_phone}</td>
                                        <td>{vendor?.vendor_selling_price}</td>
                                        <td>{vendor?.distance}</td>

                                        <td className="d-flex">
                                            <Button
                                                size="sm"
                                                className="savebtn"
                                                title="Assign"
                                                onClick={() => {
                                                    handleAssignVendor(vendor?.vendor_id, vendor?.vendor_selling_price);
                                                }}
                                            >
                                                Assign
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default NearestVendorlist;
