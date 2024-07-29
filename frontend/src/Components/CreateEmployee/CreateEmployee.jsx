import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const CreateEmployee = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false); // Add loading state
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

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setEmployee((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when submission starts
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
      console.log('Sending request with form data:', Object.fromEntries(formData.entries()));
      const response = await axios.post('http://localhost:3000/api/v1/admin/employee/create', formData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Employee created successfully!');
      navigate('/list'); // Navigate back to the employee list page
    } catch (error) {
      console.error('Error creating employee:', error.response?.data || error.message);
      toast.error(`Failed to create employee. ${error.response?.data?.message || 'An unknown error occurred.'}`);
    } finally {
      setLoading(false); // Set loading to false when submission ends
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <main>
          <div className="row g-5">
            <div className="col-md-7 col-lg-8">
              <h4 className="mb-3">Create Employee</h4>
              {loading ? (
                <div className="d-flex justify-content-center mt-5">
                  <div className="spinner-border text-success" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              ) : (
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
                    <div className="col-sm-6">
                      <label htmlFor="course" className="form-label">Course</label>
                      <input
                        type="text"
                        className="form-control"
                        id="courseName"
                        name="course"
                        value={employee.course}
                        onChange={handleChange}
                        required
                      />
                      <div className="invalid-feedback">
                        Valid course name is required.
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
                    <div className="col-12">
                      <label htmlFor="mobile" className="form-label">Mobile</label>
                      <input
                        type="text"
                        className="form-control"
                        id="mobile"
                        name="mobile"
                        value={employee.mobile}
                        onChange={handleChange}
                        required
                      />
                      <div className="invalid-feedback">
                        Please enter a valid mobile number.
                      </div>
                    </div>
                    <div className="col-md-5">
                      <label htmlFor="designation" className="form-label">Designation</label>
                      <select
                        className="form-select"
                        id="designation"
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
                      <label htmlFor="gender" className="form-label">Gender</label>
                      <select
                        className="form-select"
                        id="gender"
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
                        required
                      />
                      <div className="invalid-feedback">
                        Photo is required.
                      </div>
                    </div>
                  </div>
                  <hr className="my-4" />
                  <button className="w-100 btn btn-success btn-lg" type="submit">Create Employee</button>
                </form>
              )}
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default CreateEmployee;
