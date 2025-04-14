import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import progressImg from "../image/progressGraph.jpeg"; // Swap with actual progress chart if available

function Insights() {
  const weeklyStats = {
    workoutsCompleted: 4,
    caloriesBurned: 1600,
    avgSteps: 7500,
    mostActiveDay: "Wednesday",
  };

  const suggestions = [
    "Try incorporating a HIIT session this week to boost calorie burn.",
    "Aim for 8,000 steps a day to gradually improve your endurance.",
    "Hydration plays a key role! Drink 2-3L of water daily.",
  ];

  const tips = [
    "Consistency > intensity. Keep showing up!",
    "Sleep fuels recovery. Prioritize 7–9 hours a night.",
    "Add music to workouts — it boosts endurance by 15%!",
  ];

  return (
    <Container className="mt-5">
      <h1 className="text-center text-danger mb-4 fw-bold">Smart Fitness Insights</h1>

      {/* Weekly Progress */}
      <Row className="mb-5">
        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title className="text-danger">Weekly Progress Summary</Card.Title>
              <ul className="list-unstyled mt-3">
                <li>✅ Workouts Completed: <strong>{weeklyStats.workoutsCompleted}</strong></li>
                <li>🔥 Calories Burned: <strong>{weeklyStats.caloriesBurned}</strong> kcal</li>
                <li>🚶 Avg Steps/Day: <strong>{weeklyStats.avgSteps}</strong></li>
                <li>🏆 Most Active Day: <strong>{weeklyStats.mostActiveDay}</strong></li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} className="text-center">
          <img src={progressImg} alt="Progress Graph" className="img-fluid rounded shadow" />
          <p className="mt-2 text-muted">*Mock progress graph — can be dynamic later!</p>
        </Col>
      </Row>

      {/* Suggestions Section */}
      <Row className="mb-5">
        <Col>
          <Card className="p-3 shadow-sm">
            <Card.Title className="text-danger">Suggestions to Improve</Card.Title>
            <ul className="mt-3">
              {suggestions.map((tip, idx) => (
                <li key={idx} className="mb-2">💡 {tip}</li>
              ))}
            </ul>
          </Card>
        </Col>
      </Row>

      {/* Weekly Motivational Tips */}
      <Row>
        <Col>
          <Card className="p-3 shadow-sm">
            <Card.Title className="text-danger">Weekly Motivation</Card.Title>
            <ul className="mt-3">
              {tips.map((t, i) => (
                <li key={i} className="mb-2">💬 {t}</li>
              ))}
            </ul>
          </Card>
        </Col>
      </Row>
      <div>
         {/* Footer */}
      <footer style={{ padding: "10px 0", backgroundColor: "#2E3A59", color: "#fff", textAlign: "center", marginTop:"30px"}}>
        <Container>
          <p className="mb-0">&copy; 2025 Fanshawe Fitness. All rights reserved.</p>
          <p style={{ fontSize: "14px", opacity: 0.8 }}>Built with ❤️ by the Fanshawe Web Dev Team</p>
        </Container>
      </footer>
      </div>
    </Container>
    
  );
}

export default Insights;
