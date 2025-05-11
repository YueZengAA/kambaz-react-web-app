import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (7)</h2> <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/1234/Home"
                className="wd-dashboard-course-link" >
            <img src="/images/reactjs.jpg" width={200} />
            <div>
              <h5> CS1234 React JS </h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer  </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
            <Link to="/Kambaz/Courses/1234/Home"
                    className="wd-dashboard-course-link" >
                <img src="/images/5001.jpg" width={200} />
                <div>
                <h5> CS5001 Foundation of Computer Sciences </h5>
                <p className="wd-dashboard-course-title">
                    Fall 2024  </p>
                <button> Go </button>
                </div>
            </Link>
        </div>

        <div className="wd-dashboard-course">
            <Link to="/Kambaz/Courses/1234/Home"
                    className="wd-dashboard-course-link" >
                <img src="/images/Action.jpg" width={200} />
                <div>
                <h5> AI in Action </h5>
                <p className="wd-dashboard-course-title">
                    AI in the Workplace  </p>
                <button> Go </button>
                </div>
            </Link>
        </div>

        <div className="wd-dashboard-course">
            <Link to="/Kambaz/Courses/1234/Home"
                    className="wd-dashboard-course-link" >
                <img src="/images/Math.jpg" width={200} />
                <div>
                <h5> Align Math </h5>
                <p className="wd-dashboard-course-title">
                    Align Math Foundations  </p>
                <button> Go </button>
                </div>
            </Link>
        </div>

        <div className="wd-dashboard-course">
            <Link to="/Kambaz/Courses/1234/Home"
                    className="wd-dashboard-course-link" >
                <img src="/images/5004.jpg" width={200} />
                <div>
                <h5> Object-Oriented Design </h5>
                <p className="wd-dashboard-course-title">
                    Spring 2025  </p>
                <button> Go </button>
                </div>
            </Link>
        </div>

        <div className="wd-dashboard-course">
            <Link to="/Kambaz/Courses/1234/Home"
                    className="wd-dashboard-course-link" >
                <img src="/images/5002.jpg" width={200} />
                <div>
                <h5> Discrete Structures </h5>
                <p className="wd-dashboard-course-title">
                    Fall 2024  </p>
                <button> Go </button>
                </div>
            </Link>
        </div>

        <div className="wd-dashboard-course">
            <Link to="/Kambaz/Courses/1234/Home"
                    className="wd-dashboard-course-link" >
                <img src="/images/5008.jpg" width={200} />
                <div>
                <h5> Data Structure and Algorithms </h5>
                <p className="wd-dashboard-course-title">
                    Spring 2024  </p>
                <button> Go </button>
                </div>
            </Link>
        </div>
      </div>
    </div>
);}
