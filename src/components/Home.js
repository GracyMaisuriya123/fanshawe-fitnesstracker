import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import fitnessImage from "../image/fitnessImage.jpeg";
import progressGraph from "../image/progressGraph.jpeg";
import campusWellness from "../image/campusWellness.jpeg";
import setGoals from "../image/setGoals.webp";
import workoutRoutinesImage from "../image/workout-routine.jpg";
import fitnessChatImage from "../image/chat.webp";
import challengesImage from "../image/weekly-challenges.avif";
import groupWorkoutsImage from "../image/group-workout.avif";
import insights from "../image/insights.avif";

function Home() {
  return (
    <>
      {/* Hero Section */}
      <div style={{ backgroundColor: "#f8f9fa", padding: "60px 0" }}>
        <Container>
          <Row className="align-items-center">
            <Col md={6} className="text-start">
              <h1 className="text-danger fw-bold mb-3">
                Welcome to Fanshawe Fitness Tracker
              </h1>
              <p className="text-secondary fs-5">
                Your all-in-one solution to achieving your fitness and wellness goals. From personal training routines to group classes and nutrition tracking—your journey starts here!
              </p>
              <Link to="/profile">
                <Button variant="danger" size="lg" className="mt-3">
                  Get Started
                </Button>
              </Link>
            </Col>
            <Col md={6}>
              <img src={fitnessImage} alt="Fitness" className="img-fluid rounded shadow" />
            </Col>
          </Row>
        </Container>
      </div>

      {/* Core Features */}
      <div style={{ padding: "60px 0", backgroundColor: "#ffffff" }}>
        <Container>
          <h2 className="text-center mb-5 fw-bold text-dark">Core Features</h2>
          <Row className="g-4">
            <Col md={4}>
              <Card className="h-100 shadow-sm">
                <Card.Img variant="top" src={progressGraph} />
                <Card.Body>
                  <Card.Title className="text-danger">Track Your Progress</Card.Title>
                  <Card.Text>
                    Interactive dashboards help you visualize progress—track your calories, steps, and workout stats daily and weekly.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="h-100 shadow-sm">
                <Card.Img variant="top" src={campusWellness} />
                <Card.Body>
                  <Card.Title className="text-danger">Campus Wellness</Card.Title>
                  <Card.Text>
                    Stay connected with campus-wide wellness initiatives and group challenges while accessing in-house health professionals.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="h-100 shadow-sm">
                <Card.Img variant="top" src={setGoals} />
                <Card.Body>
                  <Card.Title className="text-danger">Set Your Goals</Card.Title>
                  <Card.Text>
                    Define personal goals—whether it's strength, cardio, or flexibility—and watch your transformation unfold with real-time feedback.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Navigation Links */}
      <div style={{ backgroundColor: "#f1f3f5", padding: "60px 0" }}>
        <Container>
          <h2 className="text-center text-dark fw-bold mb-4">Explore More</h2>
          <Row className="justify-content-center">
            <Col md="auto">
              <Link to="/workout-routines">
                <Button variant="outline-danger" size="lg" className="m-2">
                  Workout Routines
                </Button>
              </Link>
              <Link to="/message-board">
                <Button variant="outline-danger" size="lg" className="m-2">
                  Fitness Chat
                </Button>
              </Link>
              <Link to="/challenges">
                <Button variant="outline-danger" size="lg" className="m-2">
                  Challenges
                </Button>
              </Link>
              <Link to="/group-workouts">
                <Button variant="outline-danger" size="lg" className="m-2">
                  Group Workouts
                </Button>
              </Link>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Detailed Sections */}
      <div style={{ backgroundColor: "#ffffff", padding: "60px 0" }}>
        <Container>
          <h2 className="text-center fw-bold mb-5 text-dark">What You Can Do</h2>
          <Row className="g-5">
            <Col md={6}>
              <Card className="h-100 shadow-sm">
                <Card.Img variant="top" src={workoutRoutinesImage} />
                <Card.Body>
                  <Card.Title className="text-danger">Workout Routines</Card.Title>
                  <Card.Text>
                    Get AI-generated workout plans personalized to your fitness level and goals. Includes step-by-step guides and video tutorials.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="h-100 shadow-sm">
                <Card.Img variant="top" src={fitnessChatImage} />
                <Card.Body>
                  <Card.Title className="text-danger">Fitness Chat</Card.Title>
                  <Card.Text>
                    Ask questions, seek tips, or just chat about progress! Our fitness message board connects you with like-minded individuals and mentors.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row className="g-5 mt-4">
            <Col md={6}>
              <Card className="h-100 shadow-sm">
                <Card.Img variant="top" src={challengesImage} />
                <Card.Body>
                  <Card.Title className="text-danger">Weekly Challenges</Card.Title>
                  <Card.Text>
                    Compete in fun, interactive challenges—earn badges, top the leaderboard, and stay motivated throughout the semester!
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="h-100 shadow-sm">
                <Card.Img variant="top" src={groupWorkoutsImage} />
                <Card.Body>
                  <Card.Title className="text-danger">Group Workouts</Card.Title>
                  <Card.Text>
                    Discover scheduled sessions with experienced instructors. Meet new people, train as a team, and boost your accountability.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

{/* Smart Fitness Insights Section */}
<Row className="mt-5 align-items-center">
  <Col md={6} className="text-center">
    <img
      src={insights}
      alt="Smart Insights"
      className="img-fluid rounded shadow-lg"
    />
  </Col>
  <Col md={6}>
    <h2 className="text-danger fw-bold">Smart Fitness Insights</h2>
    <p className="text-muted lead">
      Stay informed and stay on track. Our insight engine analyzes your weekly performance to provide tailored workout tips, motivational feedback, and reminders to help you stay consistent—even during exam season.
    </p>
    <ul className="text-start text-muted" style={{ fontSize: "1rem", paddingLeft: "1.2rem" }}>
      <li>📊 Personalized weekly summaries with visuals</li>
      <li>💡 Smart suggestions based on your activity</li>
      <li>🔔 Automated motivation nudges & reminders</li>
      <li>🧘 Wellness balance tips (mental + physical)</li>
    </ul>
    <Link to="/insights">
      <Button variant="danger" size="lg" className="mt-3">
        View My Insights
      </Button>
    </Link>
  </Col>
</Row>


      {/* Footer */}
      <footer style={{ padding: "30px 0", backgroundColor: "#2E3A59", color: "#fff", textAlign: "center", marginTop:"30px"}}>
        <Container>
          <p className="mb-0">&copy; 2025 Fanshawe Fitness. All rights reserved.</p>
          <p style={{ fontSize: "14px", opacity: 0.8 }}>Built with ❤️ by Gracy Maisuriya</p>
        </Container>
      </footer>
    </>
  );
}

export default Home;




