import React from 'react';
import { Container, Button, Form } from 'react-bootstrap';

function WorkoutLog() {
  return (
    <Container className="mt-5">
      <h2>Log Your Workout</h2>
      <Form>
        <Form.Group controlId="workoutType">
          <Form.Label>Workout Type</Form.Label>
          <Form.Control type="text" placeholder="Enter workout type" />
        </Form.Group>

        <Form.Group controlId="workoutDuration">
          <Form.Label>Duration (in minutes)</Form.Label>
          <Form.Control type="number" placeholder="Enter duration" />
        </Form.Group>

        <Button variant="primary" type="submit">Log Workout</Button>
      </Form>
    </Container>
  );
}

export default WorkoutLog;
