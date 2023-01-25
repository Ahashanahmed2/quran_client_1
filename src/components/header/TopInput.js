import { Form,FormControl} from "react-bootstrap";
export default function TopInput() {
  return (
    <div className="py-1" xs="9">
      <Form >
        <FormControl  type="search"
          placeholder="Search Any Word"
          className="me-2"
          area-label="Search" />
         

        </Form >
    </div>
  );
}
