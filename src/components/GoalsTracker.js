import React from 'react';
import { Container, Button } from 'react-bootstrap';

function GoalsTracker() {
  return (
    <Container className="mt-5">
      <h2>Your Fitness Goals</h2>
      <p>Track your progress and set new fitness goals!</p>
      <Button variant="primary">Set a New Goal</Button>
    </Container>
  );
}

export default GoalsTracker;
