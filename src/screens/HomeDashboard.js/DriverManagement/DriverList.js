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
import DeleteConfirmationModal from "../../../components/Atoms/DeleteModal";
import ToastComponent from "../../../components/HOC/Toast";
const Driverlist = () => {
    const location = useLocation();
    const Assign = location?.state?.Assign;
    const orderId = location?.state?.orderId;
    const [searchTerm, setSearchTerm] = useState("");
    const [ShowToast, setShowToast] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false); // Manage sidebar visibility on mobile

    const toggleSidebar = () => setShowSidebar(!showSidebar); // Function to toggle sidebar
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };
    const {
        AllDrivers,
        assignDriver,
        drivers,
        toastMessage,
        getSpecificVendor,
        setCurrentPage,
        currentPage,
        hasNext,
        pageCount,
        deleteCommon,
        deleteDriver,
    } = useContext(VendorContext);
    const filterDriver = drivers?.filter(
        (driver, index) =>
            driver?.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            driver?.postal_code.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        AllDrivers(currentPage);
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
    // const handleViewClick = async (vendorUserId) => {
    //     try {
    //         // await getSpecificVendor(vendorUserId); // Wait for the API call to complete
    //         navigate("/vendorDetail", {state: {vendorId: vendorUserId}});
    //     } catch (error) {
    //         console.error("Error fetching vendor details:", error);
    //     }
    // };
    const handleAssignDriver = (driverId) => {
        assignDriver(orderId, driverId);
        setShowToast(true);

        // Automatically hide the toast after 5 seconds
        setTimeout(() => {
            setShowToast(false);
        }, 5000);
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
            await deleteDriver(deleteId);

            AllDrivers(currentPage); // Refresh table after deletion
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
                <Header title={"Driver Management"} toggleSidebar={toggleSidebar} />
                <div className="d-flex justify-content-between align-items-center m-4">
                    <h4>All Drivers</h4>
                    <div>
                        <Button className="savebtn" onClick={() => navigate("/driverDetail")}>
                            Add New Driver
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
                                    <th>Availablity</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filterDriver.map((driver, index) => (
                                    <tr key={driver?.id}>
                                        <td>{index + 1}</td>
                                        <td>
                                            {driver?.first_name} {driver?.last_name}
                                        </td>
                                        <td>{driver?.email}</td>
                                        <td>{driver?.postal_code}</td>
                                        <td>{driver?.phone_number}</td>
                                        <td>
                                            {driver?.is_available === true ? (
                                                <Badge pill bg="success">
                                                    Available
                                                </Badge>
                                            ) : (
                                                <Badge pill bg="danger">
                                                    Not Available
                                                </Badge>
                                            )}
                                        </td>
                                        {Assign ? (
                                            <td>
                                                <Button
                                                    size="sm"
                                                    className="savebtn"
                                                    title="Assign"
                                                    onClick={() => {
                                                        handleAssignDriver(driver?.id);
                                                    }}
                                                >
                                                    Assign
                                                </Button>
                                            </td>
                                        ) : (
                                            <td className="d-flex">
                                                <Button
                                                    variant="outline-primary"
                                                    size="sm"
                                                    className="me-2"
                                                    title="View"
                                                    onClick={() => {
                                                        navigate("/driverDetail", {
                                                            state: {Driver: driver, view: true},
                                                        });
                                                    }}
                                                >
                                                    <FaEye />
                                                </Button>
                                                <Button
                                                    variant="outline-success"
                                                    size="sm"
                                                    className="me-2"
                                                    title="Edit"
                                                    onClick={() => {
                                                        navigate("/driverDetail", {
                                                            state: {Driver: driver, isEdit: true},
                                                        });
                                                    }}
                                                >
                                                    <AiFillEdit />
                                                </Button>

                                                <Button
                                                    variant="outline-danger"
                                                    size="sm"
                                                    title="Delete"
                                                    onClick={() => handleDeleteClick(driver?.id)}
                                                >
                                                    <AiFillDelete />
                                                </Button>
                                            </td>
                                        )}
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
                    message={"This Driver will be deleted immediately. You can’t undo this action."}
                />
                <ToastComponent
                    show={ShowToast}
                    type={"success"}
                    message={toastMessage}
                    onClose={() => setShowToast(false)}
                />
            </div>
        </div>
    );
};

export default Driverlist;
