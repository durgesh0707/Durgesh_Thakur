import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, propsRes] = await Promise.all([
          axios.get("/api/admin/users", { withCredentials: true }),
          axios.get("/api/admin/properties", { withCredentials: true }),
        ]);

        // ✅ Debug logs
        console.log("✅ Users:", usersRes.data);
        console.log("✅ Properties:", propsRes.data);

        setUsers(usersRes.data);
        setProperties(propsRes.data);
      } catch (err) {
        console.error("❌ Admin fetch error:", err.response?.data || err.message);
        if (err.response?.status === 403) {
          navigate("/"); // redirect non-admins
        } else {
          setError("Something went wrong.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [navigate]);

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`/api/admin/user/${id}`, { withCredentials: true });
      setUsers(users.filter(u => u._id !== id));
    } catch (err) {
      alert("Failed to delete user");
    }
  };

  const approveProperty = async (id) => {
    try {
      await axios.put(`/api/admin/property/${id}/approve`, {}, { withCredentials: true });
      setProperties(properties.map(p => p._id === id ? { ...p, isApproved: true } : p));
    } catch (err) {
      alert("Approval failed");
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Users</h2>
        <ul className="space-y-2">
          {users.map(user => (
            <li key={user._id} className="flex justify-between bg-gray-100 p-3 rounded shadow-sm">
              <span>{user.name} ({user.email})</span>
              <button
                onClick={() => deleteUser(user._id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">Properties</h2>
        <ul className="space-y-2">
          {properties.map(property => (
            <li key={property._id} className="flex justify-between bg-gray-100 p-3 rounded shadow-sm">
              <span>{property.title} - {property.isApproved ? "✅ Approved" : "❌ Pending"}</span>
              {!property.isApproved && (
                <button
                  onClick={() => approveProperty(property._id)}
                  className="text-green-600 hover:underline"
                >
                  Approve
                </button>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default AdminDashboard;
