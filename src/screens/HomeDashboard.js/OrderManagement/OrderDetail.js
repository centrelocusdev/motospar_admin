import React, {useContext, useEffect, useState} from "react";
import Sidebar from "../../../components/Atoms/Sidebar";
import Header from "../../../components/HOC/Header";
import {VendorContext} from "../../../context/VendorContext";
import {Card, Button, Image, Col, Form, Row, Offcanvas} from "react-bootstrap";
import {FaPhoneAlt, FaEnvelope, FaGlobe, FaMapMarkerAlt, FaMoneyBillWave, FaFileInvoice} from "react-icons/fa";
import dayjs from "dayjs";
import {useLocation, useNavigate} from "react-router-dom";
import ToastComponent from "../../../components/HOC/Toast";
const OrderDetail = () => {
    const {updateProductStatus, toastMessage} = useContext(VendorContext);
    const navigate = useNavigate();
    const location = useLocation();
    const orderDetail = location.state?.orderDetail;
    const itemdetail = location.state?.itemdetail;

    const [ShowToast, setShowToast] = useState(false);
    const [currentStatus, setcurrentStatus] = useState(itemdetail?.order_status);
    const [showSidebar, setShowSidebar] = useState(false); // Manage sidebar visibility on mobile

    const toggleSidebar = () => setShowSidebar(!showSidebar); // Function to toggle sidebar
    const handleUpdateStatus = (value) => {
        setcurrentStatus(value);
        updateProductStatus(itemdetail?.id, value);
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
                <Header title={"Order Management"} toggleSidebar={toggleSidebar} />

                <div className="row align-items-center m-4">
                    {/* Product Name and Order Code */}
                    <div className="col-12 col-md-6 mb-3 mb-md-0">
                        <h4>
                            {itemdetail?.product?.name} ({orderDetail?.order_code})
                        </h4>
                    </div>

                    {/* Buttons */}
                    <div className="col-12 col-md-6 text-md-end text-center">
                        {itemdetail?.order_status === "ASSIGNED_TO_VENDOR" ? null : (
                            <Button
                                className="savebtn mb-0 mb-md-0"
                                onClick={() => {
                                    navigate("/nearestVendorList", {
                                        state: {
                                            itemId: itemdetail?.id,
                                            itemName: itemdetail?.product?.name,
                                        },
                                    });
                                }}
                            >
                                Assign Vendor
                            </Button>
                        )}
                        {orderDetail?.driver_fees == "0.00" ? null : orderDetail?.driver_otp == "" ? (
                            <Button
                                className="savebtn ms-2 ms-md-3"
                                onClick={() => {
                                    navigate("/driverList", {
                                        state: {
                                            orderId: orderDetail?.id,
                                            Assign: true,
                                        },
                                    });
                                }}
                            >
                                Assign Driver
                            </Button>
                        ) : (
                            <Button
                                className="savebtn ms-2 ms-md-3"
                                onClick={() => {
                                    navigate("/driverList", {
                                        state: {
                                            orderId: orderDetail?.id,
                                            Assign: true,
                                        },
                                    });
                                }}
                                disabled
                                style={{
                                    backgroundColor: "gray",
                                    borderColor: "gray",
                                    color: "white",
                                }}
                            >
                                Assign Driver
                            </Button>
                        )}
                    </div>
                </div>
                <div className="d-flex flex-wrap p-4">
                    <ToastComponent
                        show={ShowToast}
                        type={"success"}
                        message={toastMessage}
                        onClose={() => setShowToast(false)}
                    />
                    <div className="mt-0">
                        <Card className=" shadow-sm" style={{Width: "auto", margin: "auto"}}>
                            <h5 className="subHeading">Customer Details</h5>
                            <hr className="divider " />
                            <div className="d-flex justify-content-center mt-3  ">
                                <Image
                                    src={
                                        orderDetail?.customer_details?.profile_picture
                                            ? orderDetail?.customer_details?.profile_picture
                                            : require("../../../assets/images/defaultprofile.webp")
                                    }
                                    roundedCircle
                                    style={{
                                        width: "100px",
                                        height: "100px",
                                        display: "block",
                                        margin: "auto",
                                        objectFit: "cover",
                                    }}
                                />
                            </div>
                            <Card.Body className="text-center">
                                <Card.Title className=" mb-1">
                                    <h5>{orderDetail?.customer_details?.full_name}</h5>
                                </Card.Title>
                                <Card.Text className="text-muted mb-4" style={{fontSize: "0.9rem"}}>
                                    User ID: ADV-896523alrjgakjdsnglakjsdngljSH
                                </Card.Text>

                                <Card.Text className="d-flex align-items-center ">
                                    <FaPhoneAlt className="me-2 " />{" "}
                                    <Card.Text className="text-muted " style={{fontSize: "0.9rem"}}>
                                        {orderDetail?.customer_details?.phone_number
                                            ? orderDetail?.customer_details?.phone_number
                                            : "N/A"}
                                    </Card.Text>
                                </Card.Text>
                                <Card.Text className="d-flex align-items-center">
                                    <FaEnvelope className="me-2" />{" "}
                                    <Card.Text className="text-muted " style={{fontSize: "0.9rem"}}>
                                        {orderDetail?.customer_details?.email
                                            ? orderDetail?.customer_details?.email
                                            : "N/A"}
                                    </Card.Text>
                                </Card.Text>
                                <Card.Text className="d-flex align-items-center">
                                    <FaMapMarkerAlt className="me-2" />{" "}
                                    <Card.Text className="text-muted " style={{fontSize: "0.9rem"}}>
                                        {orderDetail?.shipping_address_details
                                            ? `${orderDetail?.shipping_address_details?.street_address}, ${orderDetail?.shipping_address_details?.city}, ${orderDetail?.shipping_address_details?.state}, ${orderDetail?.shipping_address_details?.postal_code}`
                                            : "N/A"}
                                    </Card.Text>
                                </Card.Text>
                            </Card.Body>
                            <hr className="divider " />
                            <h5 className="m-3">Payment Details</h5>
                            <Card.Body>
                                <Card.Text className="d-flex align-items-center ">
                                    <FaMoneyBillWave className="me-2" />{" "}
                                    <Card.Text className="text-muted " style={{fontSize: "0.9rem"}}>
                                        Cash On Delivery
                                    </Card.Text>
                                </Card.Text>
                            </Card.Body>
                            <hr className="divider " />
                            <h5 className="m-3">Order Summary</h5>
                            <Card.Body>
                                <Card.Text className="d-flex align-items-center justify-content-between ">
                                    <div>
                                        <Card.Text className="text-muted " style={{fontSize: "0.9rem"}}>
                                            Delivery Charge
                                        </Card.Text>
                                        <Card.Text className="text-muted " style={{fontSize: "0.9rem"}}>
                                            Total of ({orderDetail?.order_items.length}{" "}
                                            {orderDetail?.order_items.length > 1 ? "items" : "item"})
                                        </Card.Text>
                                    </div>
                                    <div>
                                        <Card.Text className="text-muted " style={{fontSize: "0.9rem"}}>
                                            {itemdetail?.product?.delivery_charge}
                                        </Card.Text>
                                        <Card.Text className="text-muted " style={{fontSize: "0.9rem"}}>
                                            {orderDetail?.total_price}
                                        </Card.Text>
                                    </div>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                    <div style={{flex: 1, height: "auto"}}>
                        <Card className="shadow-sm rounded ms-5">
                            <h5 className="subHeading">Order Action</h5>
                            <hr className="divider " />
                            <Card.Body>
                                <div className="d-flex align-items-center justify-content-between ">
                                    <div>
                                        <Card.Text className="text mb-1" style={{fontSize: "1rem"}}>
                                            #{orderDetail?.order_code}
                                        </Card.Text>
                                        <Card.Text className="text-muted mb-1" style={{fontSize: "0.8rem"}}>
                                            {dayjs(orderDetail?.created_at).format("MMMM D, YYYY [at] h:mm A")}
                                        </Card.Text>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <FaFileInvoice className="me-2" />{" "}
                                        <a href="#" className="nav-link text-muted fs-8">
                                            Invoice
                                        </a>
                                    </div>
                                </div>
                                <Col md={6}>
                                    <Form.Group controlId="stockStatus">
                                        <Form.Label className="pt-3">Current Status</Form.Label>
                                        <Form.Select
                                            value={currentStatus} // Bind the value to the state
                                            onChange={(e) => {
                                                handleUpdateStatus(e.target.value);
                                            }}
                                        >
                                            <option value="ADMIN_REVIEW">ADMIN_REVIEW</option>
                                            <option value="PENDING">PENDING</option>
                                            <option value="ASSIGNED_TO_VENDOR">ASSIGNED_TO_VENDOR</option>
                                            <option value="VENDOR_ACCEPTED">VENDOR_ACCEPTED</option>
                                            <option value="DELIVERED">DELIVERED</option>
                                            <option value="CANCELLED">CANCELLED</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <div className="d-flex align-items-center justify-content-between mt-3">
                                    <div>
                                        <Card.Text className="text mb-1" style={{fontSize: "1rem"}}>
                                            Shipped with India Post
                                        </Card.Text>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <a href="#" className="nav-link text-warning fs-8 color-oange">
                                            See all updates
                                        </a>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center mt-3">
                                    <Button variant="outline-warning" className="me-3">
                                        Refund
                                    </Button>
                                    <Button variant="outline-warning" className="me-3">
                                        Cancel Order
                                    </Button>
                                </div>
                                <div>
                                    {orderDetail?.driver_otp == "" ? null : (
                                        <Card.Text className="text mt-2" style={{fontSize: "1rem"}}>
                                            OTP for Driver : {orderDetail?.driver_otp}
                                        </Card.Text>
                                    )}
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                    {/* <Card className="shadow-sm rounded m-4" style={{flex: 1}}>
                        <h5 className="subHeading p-3">Basic Details</h5>
                        <hr className="divider " />
                        <Card.Body>
                            <Form>
                                <Form.Group controlId="formName">
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={userDetail?.address ? userDetail?.address : "N/A"}
                                    />
                                </Form.Group>

                                <Row className="mt-3">
                                    <Col md={4}>
                                        <Form.Group controlId="formName">
                                            <Form.Label>State</Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={userDetail?.state ? userDetail?.state : "N/A"}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={4}>
                                        <Form.Group controlId="formName">
                                            <Form.Label>City</Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={userDetail?.city ? userDetail?.city : "N/A"}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={4}>
                                        <Form.Group controlId="formName">
                                            <Form.Label>Pincode</Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={userDetail?.postal_code ? userDetail?.postal_code : "N/A"}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Form>
                        </Card.Body>
                    </Card> */}
                </div>
            </div>
        </div>
    );
};

export default OrderDetail;
