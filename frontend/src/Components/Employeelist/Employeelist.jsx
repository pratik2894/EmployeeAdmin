import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import axios from "axios";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [order, setOrder] = useState("asc");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { user } = useSelector((state) => state.user);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/admin/employee/list`, {
        headers: {
          Authorization: `Bearer ${user.token}`
        },
        params: {
          name: search,
          sortBy: sort,
          order: order,
          page: currentPage,
          limit: 5,
        }
      });
      setEmployees(response.data.employees);
      setTotalPages(response.data.totalPages);
      setCurrentPage(response.data.currentPage);
      toast.success('All Employees Fetched successfully');
    } catch (error) {
      console.log(error.stack);
      toast.error("Error occurred while fetching employees");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [search, sort, order, currentPage, user.token]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  const handleOrderChange = (e) => {
    setOrder(e.target.value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/admin/employee/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });
      setEmployees(employees.filter(employee => employee._id !== id));
      toast.success("Employee Deleted successfully");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="search">
        <div>
          <h1>Total Employees: {employees.length}</h1>
        </div>
        <div>
          <form className="col-12 col-lg-auto mb-2 mb-lg-auto me-lg-auto" role="search">
            <input
              type="search"
              className="form-control"
              placeholder="Search by ID, Name, or Email..."
              value={search}
              onChange={handleSearchChange}
            />
          </form>
        </div>
        <div>
          <label htmlFor="employee-sort">Sort employees:</label>
          <select name="sort" id="employee-sort" value={sort} onChange={handleSortChange}>
            <option value="">--Please choose an option--</option>
            <option value="email">Email</option>
            <option value="first,last">Name</option>
            <option value="id">ID</option>
            <option value="createdAt">Date Created</option>
          </select>
          <select name="order" id="employee-order" value={order} onChange={handleOrderChange}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
          <button onClick={fetchEmployees}>Filter</button>
        </div>
      </div>

      {loading ? (
        <div className="d-flex justify-content-center mt-5">
          <div className="spinner-border text-success" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <table id="customers" className="table table-striped">
          <thead>
            <tr>
              <th>Unique ID</th>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile No</th>
              <th>Designation</th>
              <th>Gender</th>
              <th>Course</th>
              <th>Create Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee._id}>
                <td><Link to={`/list/${employee._id}`}>{employee._id}</Link></td>
                <td>
  <img 
    src={employee.profilePicture || `${employee.photo}`} 
    alt="profile" 
    className="img-fluid rounded-circle" 
    style={{ width: "50px", height: "50px", objectFit: "cover" }}
  />
</td>
                <td>{employee.first}</td>
                <td>{employee.email}</td>
                <td>{employee.mobile}</td>
                <td>{employee.Designation}</td>
                <td>{employee.gender}</td>
                <td>{employee.course}</td>
                <td>{new Date(employee.createdAt).toLocaleDateString()}</td>
                <td>
                  <Link to={`/edit/${employee._id}`}>
                    <i
                      style={{ cursor: "pointer", color: "green" }}
                      className="fa-solid fa-pencil"
                    ></i>
                  </Link>{" "}
                  |
                  <i
                    style={{ cursor: "pointer", color: "red" }}
                    className="fa-solid fa-trash"
                    onClick={() => handleDelete(employee._id)}
                  ></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

<div className="pagination justify-content-center my-3">
  <button
    className="btn btn-outline-primary mx-1"
    onClick={() => handlePageChange(currentPage - 1)}
    disabled={currentPage === 1}
  >
    &laquo;
  </button>
  {[...Array(totalPages)].map((_, index) => (
    <button
      key={index}
      onClick={() => handlePageChange(index + 1)}
      className={`btn mx-1 ${index + 1 === currentPage ? "btn-primary" : "btn-outline-primary"}`}
    >
      {index + 1}
    </button>
  ))}
  <button
    className="btn btn-outline-primary mx-1"
    onClick={() => handlePageChange(currentPage + 1)}
    disabled={currentPage === totalPages}
  >
    &raquo;
  </button>
</div>


      <Footer />
    </>
  );
};

export default EmployeeList;
