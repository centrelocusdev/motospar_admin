import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend,
} from "recharts";
import {Card, Row, Col} from "react-bootstrap";

const barChartData = [
    {name: "01", value: 150000},
    {name: "02", value: 300000},
    {name: "03", value: 300000},
    {name: "04", value: 150000},
    {name: "05", value: 300000},
    {name: "06", value: 300000},
    {name: "07", value: 300000},
];

const pieChartData = [
    {name: "Helmet", value: 65, color: "#FF7300"},
    {name: "Tyre", value: 15, color: "#0088FE"},
    {name: "Seat Cover", value: 10, color: "#FFBB28"},
    {name: "Other", value: 5, color: "#FF8042"},
];

const SalesGraph = ({data}) => {
    return (
        <Row className="g-4">
            {/* Revenue Bar Chart */}
            <Col xs={12} lg={8}>
                <Card className="shadow-sm mb-4 rounded custom-card">
                    <Card.Body>
                        <h5 className="mb-4">Revenue</h5>
                        <div style={{width: "100%", height: "300px"}}>
                            <ResponsiveContainer>
                                <BarChart data={barChartData}>
                                    <CartesianGrid strokeDasharray="2 2" />
                                    <XAxis dataKey="name" />
                                    <YAxis tickFormatter={(value) => `₹${value.toLocaleString()}`} />
                                    <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
                                    <Bar dataKey="value" fill="#FF7300" barSize={10} radius={[5, 5, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </Card.Body>
                </Card>
            </Col>

            {/* Revenue by Product Pie Chart */}
            <Col xs={12} lg={4}>
                <Card className="shadow-sm mb-4 rounded custom-card">
                    <Card.Body>
                        <h5 className="mb-4">Revenue by Product</h5>
                        <div style={{width: "100%", height: "300px"}}>
                            <ResponsiveContainer>
                                <PieChart>
                                    <Pie
                                        data={pieChartData}
                                        dataKey="value"
                                        nameKey="name"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius="80%"
                                        fill="#FF7300"
                                        label={({percent}) => `${(percent * 100).toFixed(0)}%`}
                                    >
                                        {pieChartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Legend verticalAlign="bottom" align="center" />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
};

export default SalesGraph;
