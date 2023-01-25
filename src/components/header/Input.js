import { FloatingLabel, Form } from "react-bootstrap";

export default function Input({ placehold, h, value, set, stat }) {
  return (
    <>
      <h3>{placehold}</h3>
      <h3>{stat}</h3>
      <FloatingLabel controlId="floatingTextarea2" label={placehold}>
        <Form.Control
          as="textarea"
          placeholder="vsefvsdvfs"
          style={{ height: h }}
          value={value}
          onChange={set}
        />
      </FloatingLabel>
    </>
  );
}
