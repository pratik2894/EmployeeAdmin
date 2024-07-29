import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const [employee, setEmployee] = useState({
    first: '',
    last: '',
    email: '',
    mobile: '',
    Designation: '',
    gender: '',
    course: '',
    photo: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/admin/employee/details/${id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setEmployee({
          first: response.data.employee.first,
          last: response.data.employee.last,
          email: response.data.employee.email,
          mobile: response.data.employee.mobile,
          Designation: response.data.employee.Designation,
          gender: response.data.employee.gender,
          course: response.data.employee.course,
          photo: null, // Set to null or keep existing photo URL if needed
        });
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchEmployeeDetails();
  }, [id, user.token]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setEmployee((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('first', employee.first);
    formData.append('last', employee.last);
    formData.append('email', employee.email);
    formData.append('mobile', employee.mobile);
    formData.append('Designation', employee.Designation);
    formData.append('gender', employee.gender);
    formData.append('course', employee.course);
    if (employee.photo) {
      formData.append('image', employee.photo);
    }

    try {
      const response = await axios.put(`http://localhost:3000/api/v1/admin/employee/update/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Employee updated successfully!');
      navigate('/list'); // Navigate back to the employee list page
      toast.success("Employee Updated successfully")
    } catch (error) {
      console.error(error);
      toast.error("Failed to Update Employee")
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="container">
        <main>
          <div className="row g-5">
            <div className="col-md-7 col-lg-8">
              <h4 className="mb-3">Edit Employee</h4>
              <form className="needs-validation" onSubmit={handleSubmit} noValidate>
                <div className="row g-3">
                  <div className="col-sm-6">
                    <label htmlFor="firstName" className="form-label">First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="firstName"
                      name="first"
                      value={employee.first}
                      onChange={handleChange}
                      required
                    />
                    <div className="invalid-feedback">
                      Valid first name is required.
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <label htmlFor="lastName" className="form-label">Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="lastName"
                      name="last"
                      value={employee.last}
                      onChange={handleChange}
                      required
                    />
                    <div className="invalid-feedback">
                      Valid last name is required.
                    </div>
                  </div>
                  <div className="col-12">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={employee.email}
                      onChange={handleChange}
                      required
                    />
                    <div className="invalid-feedback">
                      Please enter a valid email address.
                    </div>
                  </div>
                  <div className="col-md-5">
                    <label htmlFor="country" className="form-label">Designation</label>
                    <select
                      className="form-select"
                      id="country"
                      name="Designation"
                      value={employee.Designation}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Choose...</option>
                      <option>Manager</option>
                      <option>Team Lead</option>
                      <option>Developer</option>
                    </select>
                    <div className="invalid-feedback">
                      Please select a valid designation.
                    </div>
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="state" className="form-label">Gender</label>
                    <select
                      className="form-select"
                      id="state"
                      name="gender"
                      value={employee.gender}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Choose...</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Prefer not to say</option>
                    </select>
                    <div className="invalid-feedback">
                      Please provide a valid gender.
                    </div>
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="photo" className="form-label">Select Profile Photo</label>
                    <input
                      type="file"
                      className="form-control"
                      id="photo"
                      name="photo"
                      onChange={handleChange}
                    />
                    <div className="invalid-feedback">
                      Photo is required.
                    </div>
                  </div>
                </div>
                <hr className="my-4" />
                <button className="w-100 btn btn-success btn-lg" type="submit">Update Employee</button>
              </form>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default EditEmployee;
