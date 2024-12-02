import React, {useContext, useEffect, useState} from "react";
import Sidebar from "../../../components/Atoms/Sidebar";
import Header from "../../../components/HOC/Header";
import {VendorContext} from "../../../context/VendorContext";
import {Card, Button, Image, Col, Form, Row, Offcanvas} from "react-bootstrap";
import {FaPhoneAlt, FaEnvelope, FaGlobe} from "react-icons/fa";
import dayjs from "dayjs";
import {useLocation} from "react-router-dom";
import ToastComponent from "../../../components/HOC/Toast";
const SpecifcProductList = () => {
    const {updateProductRequest, toastMessage} = useContext(VendorContext);
    const location = useLocation();
    const product = location.state?.product;
    const [ShowToast, setShowToast] = useState(false);
    const [message, setmessage] = useState("");
    const [showSidebar, setShowSidebar] = useState(false); // Manage sidebar visibility on mobile

    const toggleSidebar = () => setShowSidebar(!showSidebar); // Function to toggle sidebar
    console.log("jhdbfjh", product);
    const handleReject = (value) => {
        updateProductRequest(product?.id, value);
        setmessage("Product has been Rejected");
        setShowToast(true);
        setTimeout(() => {
            setShowToast(false);
        }, 5000); //
    };
    const handleAccept = (value) => {
        updateProductRequest(product?.id, value);
        setmessage("Product has been Accepted");
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
                    <Offcanvas.Title></Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Sidebar /> {/* Sidebar content */}
                </Offcanvas.Body>
            </Offcanvas>
            <div style={{flex: 1}}>
                <Header title={"Vendor Management"} toggleSidebar={toggleSidebar} />
                <ToastComponent
                    show={ShowToast}
                    type={message == "Product has been Accepted" ? "success" : "error"}
                    message={message}
                    onClose={() => setShowToast(false)}
                />
                <div className="d-flex justify-content-between align-items-center m-4">
                    <h4>{product?.vendor?.full_name}</h4>
                </div>
                <div className="d-flex flex-wrap p-4">
                    <div className="mt-4">
                        <Card className="shadow-sm" style={{Width: "auto", margin: "auto"}}>
                            <h5 className="subHeading p-3">Vendor Details</h5>
                            <hr className="divider " />
                            <div className="d-flex justify-content-center mt-3">
                                <Image
                                    src={
                                        product?.vendor?.profile_picture
                                            ? `https://motospar.thedelvierypointe.com${product?.vendor?.profile_picture}`
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
                            <Card.Body>
                                <Card.Title className=" text-center mt-2 mb-1">
                                    <h5>{product?.vendor?.full_name}</h5>
                                </Card.Title>
                                <Card.Text className="text-muted mb-4" style={{fontSize: "0.9rem"}}>
                                    vendor ID: ADV-896523alrjgakjdsnglakjsdngljSH
                                </Card.Text>

                                <Card.Text className="d-flex align-items-center ">
                                    <FaPhoneAlt className="me-2 " />{" "}
                                    <Card.Text className="text-muted " style={{fontSize: "0.9rem"}}>
                                        {product?.vendor?.vendor_profile?.store_contact_phone
                                            ? product?.vendor?.vendor_profile?.store_contact_phone
                                            : "N/A"}
                                    </Card.Text>
                                </Card.Text>
                                <Card.Text className="d-flex align-items-center">
                                    <FaEnvelope className="me-2" />{" "}
                                    <Card.Text className="text-muted " style={{fontSize: "0.9rem"}}>
                                        {product?.vendor?.vendor_profile?.store_contact_email
                                            ? product?.vendor?.vendor_profile?.store_contact_email
                                            : "N/A"}
                                    </Card.Text>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                    {/* rightside product detail */}
                    <Card className="shadow-sm rounded m-4" style={{flex: 1}}>
                        <h5 className="subHeading p-3">Product Details</h5>
                        <hr className="divider " />
                        <Card.Body>
                            <Form>
                                <Form.Group controlId="formName">
                                    <Form.Label>Product Name</Form.Label>
                                    <Form.Control type="text" value={product?.name ? product?.name : "N/A"} />
                                </Form.Group>

                                <Row className="mt-3">
                                    <Col md={6}>
                                        <Form.Group controlId="formName">
                                            <Form.Label>Product Category</Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={product?.category?.name ? product?.category?.name : "N/A"}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group controlId="formName">
                                            <Form.Label>Product Sub-Category</Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={
                                                    product?.sub_category?.name ? product?.sub_category?.name : "N/A"
                                                }
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className="mt-3">
                                    <Col md={6}>
                                        <Form.Group controlId="formName">
                                            <Form.Label>Price</Form.Label>
                                            <Form.Control type="text" value={product?.price ? product?.price : "N/A"} />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group controlId="formName">
                                            <Form.Label>Status</Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={
                                                    product?.is_active
                                                        ? product?.is_active
                                                            ? "Active"
                                                            : "Inactive"
                                                        : "N/A"
                                                }
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Form.Group controlId="formName ">
                                    <Form.Label className="mt-3">Product Description</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        type="text"
                                        value={product?.description ? product?.description : "N/A"}
                                    />
                                </Form.Group>
                            </Form>

                            <div className="d-flex align-items-center gap-3 mt-4 justify-content-end">
                                <Button
                                    variant="outline-warning"
                                    onClick={() => {
                                        handleReject("rejected");
                                    }}
                                >
                                    Reject
                                </Button>
                                <Button
                                    variant="success"
                                    onClick={() => {
                                        handleAccept("approved");
                                    }}
                                >
                                    Accept
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default SpecifcProductList;