import React from 'react';
import { Container, Card, Button } from 'react-bootstrap';

function Profile() {
  return (
    <Container className="mt-5">
      <Card>
        <Card.Body>
          <h2>Your Profile</h2>
          <p>View and update your personal fitness information.</p>
          <Button variant="primary">Edit Profile</Button>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Profile;
