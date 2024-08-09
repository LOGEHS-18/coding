import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ps.css';
const ProblemSet = () => {
  const [problems, setProblems] = useState([]);
  const [recentCourses, setRecentCourses] = useState([]);
  const [calendar, setCalendar] = useState([]);
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/problems')
      .then((response) => response.json())
      .then((data) => setProblems(data));

    fetch('http://localhost:5000/recentCourses')
      .then((response) => response.json())
      .then((data) => setRecentCourses(data));

    fetch('http://localhost:5000/calendar')
      .then((response) => response.json())
      .then((data) => setCalendar(data));

    fetch('http://localhost:5000/topics')
      .then((response) => response.json())
      .then((data) => setTopics(data));
  }, []);

  return (
    <div className="container mt-4">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-center">
        <a className="navbar-brand" href="#">LeetCode</a>
      </nav>

      <div className="row mt-4">
        {/* Recent Courses */}
        <div className="col-md-4">
          <h3>Recent Courses</h3>
          {recentCourses.map(course => (
            <div key={course.id} className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">{course.title}</h5>
                <p className="card-text">{course.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Calendar */}
        <div className="col-md-4 text-center">
          <h3>Active Days</h3>
          <div className="calendar">
            {calendar.map((day, index) => (
              <div key={index} className={`day ${day.active ? 'bg-success text-white' : 'bg-light'}`}>
                {day.date}
              </div>
            ))}
          </div>
        </div>

        {/* Topics */}
        <div className="col-md-4">
          <h3>Topics</h3>
          {topics.map(topic => (
            <div key={topic.topic} className="mb-2">
              <h5>{topic.topic}</h5>
              <p>Total Problems: {topic.totalProblems}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Filter Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light mt-4">
        <div className="navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <input type="text" className="form-control" placeholder="Search..." />
            </li>
            <li className="nav-item ml-2">
              <select className="form-control">
                <option value="all">All Levels</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </li>
          </ul>
        </div>
      </nav>

      {/* Problem Set Table */}
      <table className="table table-striped mt-4">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Difficulty</th>
            <th>Status</th>
            <th>Solved</th>
          </tr>
        </thead>
        <tbody>
          {problems.map((problem) => (
            <tr key={problem.id}>
              <td>{problem.id}</td>
              <td>{problem.title}</td>
              <td>{problem.difficulty}</td>
              <td>{problem.status}</td>
              <td>{problem.solved ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProblemSet;
