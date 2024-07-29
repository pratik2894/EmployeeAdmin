import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
const Navbar = () => {
  return (
    <>
      <nav>
        <header>
          <div className="px-3 py-2 text-bg-dark border-bottom">
            <div className="container">
              <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                <a href="/" className="d-flex align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none">
                  <svg className="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap">
                    <use xlinkHref="#bootstrap"></use>
                  </svg>
                </a>

                <ul className="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small">
                  <li>
                    <Link to="/dashboard" className="nav-link text-secondary">
                      <svg className="bi d-block mx-auto mb-1" width="24" height="24">
                        <use xlinkHref="#home"></use>
                      </svg>
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link  to='/list' className="nav-link text-white">
                      <svg className="bi d-block mx-auto mb-1" width="24" height="24">
                        <use xlinkHref="#speedometer2"></use>
                      </svg>
                      Employee List
                    </Link>
                  </li>
                  <li>
                  <Link  to='/create' className="nav-link text-white">
                      <svg className="bi d-block mx-auto mb-1" width="24" height="24">
                        <use xlinkHref="#speedometer2"></use>
                      </svg>
                      Create Employee
                    </Link>
                  </li>

                </ul>
              </div>
            </div>
          </div>
          <div className="px-3 py-2 border-bottom mb-3">
            <div className="container d-flex flex-wrap justify-content-center">
              <form className="col-12 col-lg-auto mb-2 mb-lg-0 me-lg-auto" role="search">
                
              </form>
              <Link to=''>
              <div className="text-end">
                <button type="button" className="btn btn-primary">Logout</button>
              </div>
              </Link>
            </div>
          </div>
        </header>
      </nav>
    </>
  );
}

export default Navbar;
