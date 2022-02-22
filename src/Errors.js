import React from 'react';
import { Alert } from 'react-bootstrap';

// Renders alert message for failing to load data
function RenderError(props) {
  if (props.show) {
    return (
      <Alert variant="danger" onClose={() => props.setShow(false)} dismissible>
        {"Failed to Access Data: " + props.error}
      </Alert>
    )
  } else {
    return null;
  }
}

export default RenderError;
