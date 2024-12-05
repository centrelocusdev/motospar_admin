import React, {useContext, useEffect, useState} from "react";
import Sidebar from "../../../components/Atoms/Sidebar";
import Header from "../../../components/HOC/Header";
import {Table, Form, InputGroup, Button, Pagination, Badge, Card, Offcanvas} from "react-bootstrap";
import {AiOutlineSearch, AiFillEdit, AiFillDelete} from "react-icons/ai";
import dayjs from "dayjs";
import "../../../assets/Css/ProductList.css";
import {useNavigate} from "react-router-dom";
import {FaEye, FaArrowLeft, FaArrowRight} from "react-icons/fa";
import {VendorContext} from "../../../context/VendorContext";
import DeleteConfirmationModal from "../../../components/Atoms/DeleteModal";
const Vendorlist = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [showSidebar, setShowSidebar] = useState(false); // Manage sidebar visibility on mobile

    const toggleSidebar = () => setShowSidebar(!showSidebar); // Function to toggle sidebar
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };
    const {AllVendors, vendors, getSpecificVendor, setCurrentPage, currentPage, hasNext, pageCount, deleteCommon} =
        useContext(VendorContext);
    const filterVendor = vendors.filter(
        (vendor, index) =>
            vendor?.store_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            vendor?.store_postal_code.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        AllVendors(currentPage);
    }, [currentPage]);

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
    const handleViewClick = async (vendorUserId) => {
        try {
            // await getSpecificVendor(vendorUserId); // Wait for the API call to complete
            navigate("/vendorDetail", {state: {vendorId: vendorUserId}});
        } catch (error) {
            console.error("Error fetching vendor details:", error);
        }
    };
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const handleDeleteClick = (id) => {
        setDeleteId(id);
        setShowModal(true);
    };

    const confirmDelete = async () => {
        if (deleteId) {
            const response = await deleteCommon(`admin/vendors/${deleteId}/delete`);
            if (response.success) {
                AllVendors(currentPage); // Refresh table after deletion
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
                <Header title={"Vendor Management"} toggleSidebar={toggleSidebar} />
                <div className="m-4">
                    <h4>All Vendors</h4>
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
                                    placeholder="Search by name or Area code"
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
                                    <th>Name</th>
                                    <th>Email Id</th>
                                    <th>Area Code</th>
                                    <th>Phone Number</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filterVendor.map((vendor, index) => (
                                    <tr key={vendor?.id}>
                                        <td>{index + 1}</td>
                                        <td>{vendor?.store_name}</td>
                                        <td>{vendor?.store_contact_email}</td>
                                        <td>{vendor?.store_postal_code}</td>
                                        <td>{vendor?.store_contact_phone}</td>

                                        <td className="d-flex">
                                            <Button
                                                variant="outline-primary"
                                                size="sm"
                                                className="me-2"
                                                title="View"
                                                onClick={() => {
                                                    handleViewClick(vendor?.user);
                                                }}
                                            >
                                                <FaEye />
                                            </Button>

                                            <Button
                                                variant="outline-danger"
                                                size="sm"
                                                title="Delete"
                                                onClick={() => handleDeleteClick(vendor?.id)}
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
                    message={"This Vendor will be deleted immediately. You can’t undo this action."}
                />
            </div>
        </div>
    );
};

export default Vendorlist;
