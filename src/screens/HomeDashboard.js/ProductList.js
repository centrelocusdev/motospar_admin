import React, {useContext, useEffect, useState} from "react";
import Sidebar from "../../components/Atoms/Sidebar";
import Header from "../../components/HOC/Header";
import {Table, Form, InputGroup, Button, Pagination, Badge, Card, Offcanvas} from "react-bootstrap";
import {AiOutlineSearch, AiFillEdit, AiFillDelete} from "react-icons/ai";
import {FaEye} from "react-icons/fa";
import "../../assets/Css/ProductList.css";
import {VendorContext} from "../../context/VendorContext";
import dayjs from "dayjs";
import {useNavigate} from "react-router-dom";
import {FaArrowLeft, FaArrowRight} from "react-icons/fa";
import DeleteConfirmationModal from "../../components/Atoms/DeleteModal";
const ProductList = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [products, setproducts] = useState([]);
    const {AllProduct, Products, setspecificProduct, setCurrentPage, currentPage, hasNext, pageCount, deleteCommon} =
        useContext(VendorContext);
    const [showSidebar, setShowSidebar] = useState(false); // Manage sidebar visibility on mobile

    const toggleSidebar = () => setShowSidebar(!showSidebar); // Function to toggle sidebar
    useEffect(() => {
        AllProduct(currentPage);
    }, [currentPage]);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredProducts = Products.filter((product, index) =>
        product?.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const handleNextPage = () => {
        if (hasNext) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };
    const [showModal, setShowModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const handleDeleteClick = (id) => {
        setDeleteId(id);
        setShowModal(true);
    };

    const confirmDelete = async () => {
        if (deleteId) {
            const response = await deleteCommon(`admin/products/${deleteId}/delete`);
            if (response.success) {
                AllProduct(currentPage); // Refresh table after deletion
            } else {
                console.error("Failed to delete sub-category");
            }
            setShowModal(false);
        }
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
                <Header title={"Product Management"} toggleSidebar={toggleSidebar} />
                <div className="d-flex justify-content-between align-items-center m-4">
                    <h4>All Products</h4>
                    <div>
                        <Button className="savebtn" onClick={() => navigate("/addProduct")}>
                            Add Product
                        </Button>
                    </div>
                </div>
                <Card className="shadow-sm rounded custom-card m-4">
                    <div className="p-4">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <div className="wrapper">
                                <AiOutlineSearch className="icon" />
                                <input
                                    className="input"
                                    type="text"
                                    id="search"
                                    placeholder="Search"
                                    value={searchTerm}
                                    onChange={handleSearch}
                                />
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                                <span className="m-1">
                                    Page {currentPage} of {pageCount}
                                </span>
                                <FaArrowLeft
                                    className="m-1"
                                    onClick={handlePreviousPage}
                                    style={{
                                        cursor: currentPage === 1 ? "not-allowed" : "pointer",
                                        opacity: currentPage === 1 ? 0.5 : 1,
                                    }}
                                />
                                <FaArrowRight
                                    className="m-1"
                                    onClick={handleNextPage}
                                    style={{cursor: !hasNext ? "not-allowed" : "pointer", opacity: !hasNext ? 0.5 : 1}}
                                />
                            </div>
                        </div>

                        <Table bordered hover responsive className="align-middle">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Product Name</th>
                                    <th>Category</th>
                                    <th>Order Date</th>
                                    <th>Qty</th>
                                    <th>Price</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredProducts.map((product, index) => (
                                    <tr key={product?.id}>
                                        <td>{product?.code}</td>
                                        <td>{product?.name}</td>
                                        <td>{product?.category?.name}</td>
                                        <td>{dayjs(product?.created_at).format("YYYY-MM-DD")}</td>
                                        <td>{product?.variants[0]?.quantity_in_stock}</td>
                                        <td>₹{product?.variants[0]?.price}</td>

                                        <td className="d-flex">
                                            <Button variant="outline-primary" size="sm" className="me-2" title="View">
                                                <FaEye />
                                            </Button>
                                            <Button
                                                variant="outline-success"
                                                size="sm"
                                                className="me-2"
                                                title="Edit"
                                                onClick={() => {
                                                    console.log("isiddd", product?.product?.id);
                                                    setspecificProduct(product);
                                                    navigate("/editSpecificProductpage");
                                                }}
                                            >
                                                <AiFillEdit />
                                            </Button>
                                            <Button
                                                variant="outline-danger"
                                                size="sm"
                                                title="Delete"
                                                onClick={() => handleDeleteClick(product?.id)}
                                            >
                                                <AiFillDelete />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </Card>
                <DeleteConfirmationModal
                    show={showModal}
                    onDeleteConfirm={confirmDelete}
                    onCancel={() => setShowModal(false)}
                    message={"This product will be deleted immediately. You can’t undo this action."}
                />
            </div>
        </div>
    );
};

export default ProductList;
