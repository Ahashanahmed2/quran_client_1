import { Col, Dropdown} from "react-bootstrap";
import { NavLink,useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import Classess from "../../css/index.module.css";
import axios from "axios";
export default function Navlink() {
    const { books } = useParams();
  const [book, setBook] = useState([]);

      useEffect(() => {
        axios
          .get(`${process.env.REACT_APP_URL}/book`)
          .then((value) => {
            setBook(value.data);
          })
          .catch((err) => {
            console.log({ message: err });
          });
      },[books]);

    
  
  return (
  
        <Col>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              {books}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {book.map((value, key) => (
                <Dropdown.Item key={key}>
                  <NavLink
                    
                    className={({ isActive }) =>
                      isActive
                        ? `${Classess.hover} ${Classess.active} mx-2 px-2 py-1border border-warning`
                        : `${Classess.hover} ${Classess.unActive} mx-2 px-2 py-1 border border-warning`
                    }
                    to={`/${value.book}`}
                  >
                    {value.book}
                  </NavLink>
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
     
  );
}
