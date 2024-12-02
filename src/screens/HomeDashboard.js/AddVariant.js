import React, {useContext, useEffect, useState} from "react";
import Sidebar from "../../components/Atoms/Sidebar";
import Header from "../../components/HOC/Header";
import ProductForm from "../../components/Atoms/ProductForm";
import {Button, Offcanvas, Col, Row, Form, Card} from "react-bootstrap";
import {VendorContext} from "../../context/VendorContext";
import ToastComponent from "../../components/HOC/Toast";
import ProductImageUpload from "../../components/Atoms/ProductImageUpload";
import "../../assets/Css/ProductForm.css";
import {useNavigate} from "react-router-dom";

const AddVariant = () => {
    const navigate = useNavigate();
    const {
        specificProduct,

        AddVariant,
        toastMessage,
    } = useContext(VendorContext);

    const [showToast, setShowToast] = useState(false);
    const [name, setname] = useState(specificProduct?.name);

    const [brand, setbrand] = useState("");
    const [model, setmodel] = useState(specificProduct?.model);
    const [year, setyear] = useState("");
    const [price, setprice] = useState(null);
    const [weight, setweight] = useState(null);
    const [discount, setdiscount] = useState(null);
    const [sku, setsku] = useState("");
    const [color, setcolor] = useState("");
    const [size, setsize] = useState("");
    const [dimensions, setdimensions] = useState("");
    const [material, setmaterial] = useState("");
    const [features, setfeatures] = useState("");
    const [categoryName, setcategoryName] = useState(specificProduct?.category?.name);
    const [subCategoryName, setsubCategoryName] = useState(specificProduct?.sub_category?.name);

    const [delivery_charge, setdelivery_charge] = useState(specificProduct ? specificProduct?.delivery_charge : null);
    const [delivery_time, setdelivery_time] = useState(specificProduct ? specificProduct?.delivery_time : null);
    const [showSidebar, setShowSidebar] = useState(false); // Manage sidebar visibility on mobile

    const toggleSidebar = () => setShowSidebar(!showSidebar);

    // const handleData = (data) => {
    //     setProductDetails(data);
    // };

    const handleSave = () => {
        AddVariant(specificProduct?.id, sku, price, discount, color, size, weight, dimensions, material, features);
        setShowToast(true);

        // Automatically hide the toast after 5 seconds
        setTimeout(() => {
            setShowToast(false);
        }, 5000);
    };

    return (
        <div className="d-flex flex-column flex-md-row">
            {/* Sidebar */}
            <div className="d-none d-md-block">
                <Sidebar />
            </div>
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
                    <Sidebar />
                </Offcanvas.Body>
            </Offcanvas>

            {/* Main Content */}
            <div className="flex-grow-1">
                <Header title={"Product Management"} toggleSidebar={toggleSidebar} />

                {/* Page Header */}
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-center m-4">
                    <h4 className="mb-3 mb-md-0">Add Product Variant</h4>
                    <div className="d-flex gap-2">
                        <Button variant="outline-warning">Save to Draft</Button>
                        <Button className="savebtn" onClick={handleSave}>
                            Save
                        </Button>
                    </div>
                </div>

                {/* Product Form and Image Upload */}
                <Row className="g-4 m-0">
                    <Col xs={12} md={4}>
                        <ProductImageUpload />
                    </Col>
                    <Col xs={12} md={8}>
                        <Card className="shadow-sm rounded custom-card m-4 ">
                            <h5 className="subHeading">Add Product details</h5>
                            <hr className="divider"></hr>
                            <Card.Body>
                                <Form>
                                    <Form.Group controlId="productName">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type="text" placeholder="Name" value={name}></Form.Control>
                                    </Form.Group>

                                    <Row>
                                        <Col md={6}>
                                            <Form.Group controlId="productCategory">
                                                <Form.Label className="pt-3">Product Category</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Name"
                                                    value={categoryName}
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group controlId="SubCategory">
                                                <Form.Label className="pt-3">Product Sub Category</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Name"
                                                    value={subCategoryName}
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                        <Row>
                                            <Col md={6}>
                                                <Form.Group controlId="Delivery Charge">
                                                    <Form.Label className="pt-3">Delivery Charge</Form.Label>
                                                    <Form.Control
                                                        type="Number"
                                                        placeholder="Delivery Charge"
                                                        value={delivery_charge}
                                                    ></Form.Control>
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group controlId="Delivery Time">
                                                    <Form.Label className="pt-3">
                                                        Delivery Time (No. of days)
                                                    </Form.Label>
                                                    <Form.Control
                                                        type="Number"
                                                        placeholder="Delivery Time"
                                                        value={delivery_time}
                                                    ></Form.Control>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Col md={4}>
                                            <Form.Group controlId="sku">
                                                <Form.Label className="pt-3">Stock Keeping Unit (SKU)</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="SKU"
                                                    value={sku}
                                                    onChange={(e) => setsku(e.target.value)}
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                        <Col md={4}>
                                            <Form.Group controlId="mrp">
                                                <Form.Label className="pt-3">MRP</Form.Label>

                                                <Form.Control
                                                    type="Number"
                                                    placeholder="MRP"
                                                    value={price}
                                                    onChange={(e) => setprice(e.target.value)}
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>

                                        <Col md={4}>
                                            <Form.Group controlId="discuntedPrice">
                                                <Form.Label className="pt-3">Discount in percentage %</Form.Label>
                                                <Form.Control
                                                    type="Number"
                                                    placeholder="Discount Price"
                                                    value={discount}
                                                    onChange={(e) => setdiscount(e.target.value)} // Directly handle the change
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col md={4}>
                                            <Form.Group controlId="make">
                                                <Form.Label className="pt-3">Brand</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Brand"
                                                    value={brand}
                                                    onChange={(e) => setbrand(e.target.value)} // Directly handle the change
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={4}>
                                            <Form.Group controlId="model">
                                                <Form.Label className="pt-3">Model</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Model"
                                                    value={model}
                                                    onChange={(e) => setmodel(e.target.value)} // Directly handle the change
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={4}>
                                            <Form.Group controlId="year">
                                                <Form.Label className="pt-3">Year</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Year"
                                                    value={year} // Improved logic
                                                    onChange={(e) => setyear(e.target.value)} // Directly handle the change
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={4}>
                                            <Form.Group controlId="color">
                                                <Form.Label className="pt-3">Color</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Color"
                                                    value={color}
                                                    onChange={(e) => setcolor(e.target.value)}
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                        <Col md={4}>
                                            <Form.Group controlId="size">
                                                <Form.Label className="pt-3">Size</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Size"
                                                    value={size}
                                                    onChange={(e) => setsize(e.target.value)}
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                        <Col md={4}>
                                            <Form.Group controlId="Item_Weight">
                                                <Form.Label className="pt-3">Item Weight</Form.Label>
                                                <Form.Control
                                                    type="Number"
                                                    placeholder="Item Weight"
                                                    value={weight}
                                                    onChange={(e) => setweight(e.target.value)}
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={4}>
                                            <Form.Group controlId="dimensions">
                                                <Form.Label className="pt-3">Dimensions</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Dimensions"
                                                    value={dimensions}
                                                    onChange={(e) => setdimensions(e.target.value)}
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                        <Col md={4}>
                                            <Form.Group controlId="Material">
                                                <Form.Label className="pt-3">Material</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Material"
                                                    value={material}
                                                    onChange={(e) => setmaterial(e.target.value)}
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                        <Col md={4}>
                                            <Form.Group controlId="features">
                                                <Form.Label className="pt-3">Features</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Features"
                                                    value={features}
                                                    onChange={(e) => setfeatures(e.target.value)}
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/* Toast Notification */}
                <ToastComponent
                    show={showToast}
                    type={"success"}
                    message={toastMessage}
                    onClose={() => setShowToast(false)}
                />
            </div>
        </div>
    );
};

export default AddVariant;
