import React, {useContext, useEffect} from "react";
import SummaryCards from "./SummaryCard";
import SalesGraph from "./SalesGraph";
import RecentOrders from "./RecentOrders";
import {VendorContext} from "../../context/VendorContext";

const Dashboard = () => {
    const {getStatistics, statisticsData} = useContext(VendorContext);
    useEffect(() => {
        getStatistics();
    });
    return (
        <div style={{flex: 1}}>
            <div className="dashboard-content p-4" style={{flex: 1}}>
                <SummaryCards data={statisticsData} />
                <SalesGraph data={statisticsData} />
                <RecentOrders />
            </div>
        </div>
    );
};

export default Dashboard;
