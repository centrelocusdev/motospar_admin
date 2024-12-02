import React from "react";
import {Card, Row, Col} from "react-bootstrap";
import "../../assets/Css/Homedashboard.css";
const SummaryCards = ({data}) => {
    return (
        <Row className="g-3 mb-4">
            <Col xs={12} md={6} lg={3}>
                <Card className="shadow-sm rounded custom-card">
                    <Card.Body>
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <h5>Total Revenue</h5>
                                <h2>₹{data?.revenue_and_profit?.total_revenue}</h2>
                            </div>
                            <img
                                src={require("../../assets/images/sales.png")}
                                alt="Total Revenue"
                                className="summary-icon"
                            />
                        </div>
                        <p
                            className={
                                data?.revenue_and_profit?.revenue_change_percentage > 0
                                    ? "text-success"
                                    : data?.revenue_and_profit?.revenue_change_percentage < 0
                                    ? "text-error"
                                    : "text-neutral"
                            }
                        >
                            {data?.revenue_and_profit?.revenue_change_percentage}%
                            {data?.revenue_and_profit?.revenue_change_percentage > 0
                                ? " Up from yesterday"
                                : data?.revenue_and_profit?.revenue_change_percentage < 0
                                ? " Down from yesterday"
                                : " No change from yesterday"}
                        </p>
                    </Card.Body>
                </Card>
            </Col>
            <Col xs={12} md={6} lg={3}>
                <Card className="shadow-sm rounded custom-card">
                    <Card.Body>
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <h5>Orders</h5>
                                <h2>{data?.order_statistics?.total_orders}</h2>
                            </div>
                            <img
                                src={require("../../assets/images/orders.png")}
                                alt="Orders"
                                className="summary-icon"
                            />
                        </div>
                        <p
                            className={
                                data?.order_statistics?.order_change_percentage > 0
                                    ? "text-success"
                                    : data?.order_statistics?.order_change_percentage < 0
                                    ? "text-error"
                                    : "text-neutral"
                            }
                        >
                            {data?.order_statistics?.order_change_percentage}%
                            {data?.order_statistics?.order_change_percentage > 0
                                ? " Up from yesterday"
                                : data?.order_statistics?.order_change_percentage < 0
                                ? " Down from yesterday"
                                : " No change from yesterday"}
                        </p>
                    </Card.Body>
                </Card>
            </Col>
            <Col xs={12} md={6} lg={3}>
                <Card className="shadow-sm rounded custom-card">
                    <Card.Body>
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <h5>Buyers</h5>
                                <h2>{data?.user_statistics?.active_customers}</h2>
                            </div>
                            <img src={require("../../assets/images/ship.png")} alt="Buyers" className="summary-icon" />
                        </div>
                        <p
                            className={
                                data?.revenue_and_profit?.revenue_change_percentage > 0
                                    ? "text-success"
                                    : data?.revenue_and_profit?.revenue_change_percentage < 0
                                    ? "text-error"
                                    : "text-neutral"
                            }
                        >
                            {data?.revenue_and_profit?.revenue_change_percentage}%
                            {data?.revenue_and_profit?.revenue_change_percentage > 0
                                ? " Up from yesterday"
                                : data?.revenue_and_profit?.revenue_change_percentage < 0
                                ? " Down from yesterday"
                                : " No change from yesterday"}
                        </p>
                    </Card.Body>
                </Card>
            </Col>
            <Col xs={12} md={6} lg={3}>
                <Card className="shadow-sm rounded custom-card">
                    <Card.Body>
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <h5>Vendors</h5>
                                <h2>{data?.user_statistics?.active_vendors}</h2>
                            </div>
                            <img
                                src={require("../../assets/images/pending.png")}
                                alt="Vendors"
                                className="summary-icon"
                            />
                        </div>
                        <p className="text-success">8.5% Up from yesterday</p>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
};

export default SummaryCards;
