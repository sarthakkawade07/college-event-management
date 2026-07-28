import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function RegistrationChart({ participants }) {
 const eventCounts = {};

participants.forEach((participant) => {
  const event = participant.eventTitle;

  eventCounts[event] = (eventCounts[event] || 0) + 1;
});

const data = Object.keys(eventCounts).map((event) => ({
  event,
  registrations: eventCounts[event],
}));
  return (
    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "15px",
        boxShadow: "0 5px 15px rgba(0,0,0,.1)",
        marginTop: "25px",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          color: "#2563eb",
          marginBottom: "20px",
        }}
      >
        📈 Monthly Registration Trend
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="event" />
          <YAxis />
          <Tooltip />

          <Line
            type="monotone"
            dataKey="registrations"
            stroke="#2563eb"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default RegistrationChart;