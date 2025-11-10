import React, { useEffect, useState } from "react";
import api, {
  getLooms as fetchLoomsApi,
  updateLoom as updateLoomApi,
} from "../services/api";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function formatDateLabel(dateStr) {
  // Format date as DD/MM or MM/DD for clarity
  const d = new Date(dateStr);
  if (isNaN(d)) return dateStr;
  return `${d.getDate().toString().padStart(2, "0")}/${(d.getMonth() + 1)
    .toString()
    .padStart(2, "0")}`;
}

export default function Dashboard() {
  const [weekly, setWeekly] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loomStatus, setLoomStatus] = useState({});
  const [looms, setLooms] = useState([]);

  const getDefaultLooms = () =>
    Array.from({ length: 8 }, (_, i) => ({
      loomId: `L-${101 + i}`,
      isRunning: false,
      rpm: 0,
      currentProduct: null,
    }));

  // Fetch looms from backend
  const loadLooms = async () => {
    try {
      const res = await fetchLoomsApi();
      const data = Array.isArray(res.data) ? res.data : [];
      // Stable sort by loomId for consistent ordering
      data.sort((a, b) => String(a.loomId).localeCompare(String(b.loomId)));
      setLooms(data.length > 0 ? data : getDefaultLooms());
    } catch (e) {
      console.error("Failed to load looms", e);
      // Fallback to default placeholders so the grid always shows 8
      setLooms(getDefaultLooms());
    }
  };

  const fetchAll = async () => {
    try {
      const [wRes, oRes] = await Promise.all([
        api.get("/analytics/weekly"),
        api.get("/orders"),
      ]);
      setWeekly(wRes.data);
      setOrders(oRes.data);
    } catch (err) {
      console.error("Dashboard data fetch error:", err);
    }
  };

  useEffect(() => {
    fetchAll();
    loadLooms();
    const t = setInterval(() => {
      fetchAll();
      loadLooms();
    }, 10000);
    return () => clearInterval(t);
  }, []);

  // Chart data
  const labels = weekly.map((d) => formatDateLabel(d.date));
  const deliveries = weekly.map((d) => d.count);
  const revenue = weekly.map((d) => d.revenue);

  const data = {
    labels,
    datasets: [
      {
        label: "Deliveries",
        data: deliveries,
        backgroundColor: "rgba(59,130,246,0.8)",
        borderRadius: 12,
        barPercentage: 0.7,
      },
      {
        label: "Revenue (₹)",
        data: revenue,
        backgroundColor: "rgba(75,192,192,0.8)",
        borderRadius: 12,
        barPercentage: 0.7,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#374151",
          font: { size: 16, weight: "bold" },
        },
      },
      title: {
        display: true,
        text: "Weekly Deliveries & Revenue (2025) ",
        color: "#2563eb",
        font: { size: 22, weight: "bold" },
      },
      tooltip: {
        backgroundColor: "#fff",
        titleColor: "#2563eb",
        bodyColor: "#333",
        borderColor: "#2563eb",
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        callbacks: {
          title: (tooltipItems) => {
            // Show full date in tooltip
            const idx = tooltipItems[0].dataIndex;
            return weekly[idx]?.date
              ? `Date: ${weekly[idx].date}`
              : `Date: ${tooltipItems[0].label}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          color: "#2563eb",
          font: { size: 16, weight: "bold" },
          maxRotation: 0,
          minRotation: 0,
          autoSkip: false,
          align: "center",
          callback: function (value, index) {
            // Show formatted date label (DD/MM)
            return labels[index];
          },
        },
      },
      y: {
        grid: { color: "#e5e7eb" },
        ticks: { color: "#333", font: { size: 14 } },
      },
    },
    animation: false,
  };

  const totalRevenue = orders.reduce(
    (s, o) => s + (o.amountSettled || o.totalAmount || 0),
    0
  );

  const activeLooms = looms.filter((l) => l.isRunning).length;

  // Manual Loom Status Handlers
  const handleStart = async (loom) => {
    try {
      await updateLoomApi(loom.loomId, {
        isRunning: true,
        rpm: loom.rpm || 220,
      });
      await loadLooms();
      setLoomStatus((prev) => ({
        ...prev,
        [loom.loomId]: {
          running: true,
          startTime: Date.now(),
          stopTime: null,
          metres: prev[loom.loomId]?.metres || 0,
          speed: loom.speed || 1,
          product: loom.currentProduct?.name || "Kerala Saree",
        },
      }));
    } catch (e) {
      console.error("Failed to start loom", e);
    }
  };

  const handleStop = async (loom) => {
    try {
      await updateLoomApi(loom.loomId, { isRunning: false, rpm: 0 });
      await loadLooms();
    } catch (e) {
      console.error("Failed to stop loom", e);
    }
    setLoomStatus((prev) => {
      const status = prev[loom.loomId];
      if (!status || !status.startTime) return prev;
      const stopTime = Date.now();
      const durationMinutes = (stopTime - status.startTime) / 60000;
      const newMetres =
        durationMinutes * (loom.speed || 1) + (status.metres || 0);
      return {
        ...prev,
        [loom.loomId]: {
          ...status,
          running: false,
          stopTime,
          metres: newMetres,
        },
      };
    });
  };

  // Responsive Looms Grid: 4 per row for desktop, 2 per row for tablet/mobile
  const getLoomGridClass = (idx) => {
    return "col-12 col-sm-6 col-lg-3 mb-3 d-flex";
  };

  return (
    <div className="container-fluid py-4">
      <h2 className="mb-4 text-center">Powerloom Analytics Dashboard</h2>

      {/* Top KPI Cards */}
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card text-center p-3 shadow-sm">
            <h5>Total Orders</h5>
            <h3>{orders.length}</h3>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center p-3 shadow-sm">
            <h5>Total Revenue</h5>
            <h3>₹{totalRevenue}</h3>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center p-3 shadow-sm">
            <h5>Active Looms</h5>
            <h3>{activeLooms}</h3>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center p-3 shadow-sm">
            <h5>Stopped Looms</h5>
            <h3>{looms.length - activeLooms}</h3>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="row mb-4">
        <div className="col-12">
          <div
            className="card p-4 shadow-sm"
            style={{
              borderRadius: 20,
              background: "linear-gradient(135deg, #e0e7ff 0%, #f0fdfa 100%)",
              boxShadow: "0 4px 24px rgba(59,130,246,0.08)",
              minHeight: 420,
              width: "100%",
              maxWidth: "100%",
              height: "400px",
            }}
          >
            <div style={{ width: "100%", height: "350px" }}>
              <Bar data={data} options={options} />
            </div>
          </div>
        </div>
      </div>

      {/* Looms Status Grid */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card p-3 shadow-sm">
            <h5 className="mb-3">Looms Status</h5>
            <div className="row">
              {looms.map((l, idx) => {
                const status = loomStatus[l.loomId] || {};
                return (
                  <div
                    key={l.loomId}
                    className={getLoomGridClass(idx)}
                    style={{
                      flexDirection: "column",
                      alignItems: "stretch",
                      minWidth: 0,
                    }}
                  >
                    <div
                      className="card h-100 p-2 shadow-sm"
                      style={{ minHeight: 140 }}
                    >
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <strong>{l.loomId}</strong>
                          <div className="small text-muted">
                            {l.currentProduct?.name || "Kerala Saree"}
                          </div>
                        </div>
                        <span
                          className={`badge ${
                            l.isRunning ? "bg-success" : "bg-danger"
                          }`}
                        >
                          {l.isRunning ? "Running" : "Stopped"}
                        </span>
                      </div>
                      <div className="mt-2">
                        <button
                          className="btn btn-success btn-sm me-2"
                          onClick={() => handleStart(l)}
                          disabled={l.isRunning}
                        >
                          Start
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleStop(l)}
                          disabled={!l.isRunning}
                        >
                          Stop
                        </button>
                      </div>
                      <div className="small mt-2">
                        Product:{" "}
                        {status.product ||
                          l.currentProduct?.name ||
                          "Kerala Saree"}
                        <br />
                        Start:{" "}
                        {status.startTime
                          ? new Date(status.startTime).toLocaleTimeString()
                          : "--"}
                        <br />
                        Stop:{" "}
                        {status.stopTime
                          ? new Date(status.stopTime).toLocaleTimeString()
                          : "--"}
                        <br />
                        Metres: {status.metres ? status.metres.toFixed(2) : "0"}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="row">
        <div className="col-12 col-lg-6 mx-auto">
          <div className="card p-3 shadow-sm">
            <h5>Recent Orders</h5>
            {orders.slice(0, 6).map((o) => (
              <div key={o._id} className="border-bottom py-2">
                <div>
                  <strong>{o.customerName}</strong> — ₹{o.totalAmount}
                </div>
                <div className="small text-muted">
                  {new Date(o.placedAt).toLocaleString()} — Status: {o.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
