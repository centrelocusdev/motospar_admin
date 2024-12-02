import React, {useState} from "react";
import Dashboard from "../../components/Atoms/Dashboard";
import Sidebar from "../../components/Atoms/Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../assets/Css/Homedashboard.css";
import Header from "../../components/HOC/Header";
import {Offcanvas, Button} from "react-bootstrap"; // Import Offcanvas and Button

const Home = () => {
    const [showSidebar, setShowSidebar] = useState(false); // Manage sidebar visibility on mobile

    const toggleSidebar = () => setShowSidebar(!showSidebar); // Function to toggle sidebar

    return (
        <div className="d-flex">
            {/* Sidebar for large screens */}
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

            {/* Main Content Area */}
            <div style={{flex: 1}}>
                {/* Header with button to toggle sidebar */}
                <Header title={"Dashboard"} toggleSidebar={toggleSidebar} />
                <Dashboard />
            </div>
        </div>
    );
};

export default Home;
