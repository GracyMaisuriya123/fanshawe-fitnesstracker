import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import fitnessImage from "../image/fitnessImage.jpeg";
import progressGraph from "../image/progressGraph.jpeg";
import campusWellness from "../image/campusWellness.jpeg";
import setGoals from "../image/setGoals.webp";

function Home() {
  return (
    <Container className="mt-5 text-center">
      {/* Hero Section */}
      <Row className="align-items-center">
        <Col xs={12} md={6}>
          <h1 className="text-danger fw-bold">Welcome to the Fanshawe Fitness Tracker</h1>
          <p className="text-dark lead">
            Your personalized fitness companion. Set goals, track your progress, and integrate with Fanshawe’s campus wellness programs.
          </p>
          <Link to="/profile">
            <Button variant="danger" size="lg" className="mt-3">
              Get Started
            </Button>
          </Link>
        </Col>
        <Col xs={12} md={6}>
          <img src={fitnessImage} alt="Fitness" className="img-fluid rounded shadow-lg" />
        </Col>
      </Row>

      {/* Features Section */}
      <Row className="mt-5">
        <Col md={4} className="text-center">
          <img src={progressGraph} alt="Progress Tracking" className="img-fluid rounded mb-3 shadow-lg" />
          <h3 className="text-danger">Track Your Progress</h3>
          <p>Monitor your daily workouts, steps, and calorie burn with interactive graphs.</p>
        </Col>
        <Col md={4} className="text-center">
          <img src={campusWellness} alt="Campus Integration" className="img-fluid rounded mb-3 shadow-lg" />
          <h3 className="text-danger">Campus Wellness Integration</h3>
          <p>Join Fanshawe’s fitness challenges, campus events, and wellness programs.</p>
        </Col>
        <Col md={4} className="text-center">
          <img src={setGoals} alt="Set Goals" className="img-fluid rounded mb-3 shadow-lg" />
          <h3 className="text-danger">Set Fitness Goals</h3>
          <p>Customize your fitness goals and get real-time updates on your achievements.</p>
        </Col>
      </Row>

      {/* Call to Action */}
      <Row className="mt-5">
        <Col className="text-center">
          <h2 className="text-dark">Start Your Fitness Journey Today!</h2>
          <Link to="/goals">
            <Button variant="danger" size="lg" className="mt-3">
              Set Your Goals
            </Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;

