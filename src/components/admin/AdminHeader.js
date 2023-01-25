import { NavLink,useNavigate} from "react-router-dom";
import { Container, Row, Col, Dropdown } from "react-bootstrap";
import { useState,useEffect } from "react";
import Classess from "../../css/index.module.css";
import axios from "axios";
export default function AdminHeader(){
const [book, setBook] = useState("তাফসির গ্রন্থসমূহ");
const [bookName, setBookName] = useState([]);

     const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL}/book`)
      .then(value =>{setBookName(value.data)})
      .catch((err) => {
        console.log({ message: err });
      });
  },[])

  const changeBookName = (e) => {
    bookName.map(val => {
      
       if (e === val.book) {
         setBook(e);
       } 
    })
   
   
  }
  return (
    <Container fluid className="bg-dark py-2 ">
      <Row>
        <Col>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              {book}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {bookName.map((values,key) => (
                <Dropdown.Item key={key}>
                  <NavLink
                    name={values.book}
                    onClick={(e) => changeBookName(e.target.name)}
                    className={({ isActive }) =>
                      isActive
                        ? `${Classess.hover} ${Classess.active} mx-2 px-2 py-1 rounded-pill border border-warning`
                        : `${Classess.hover} ${Classess.unActive} mx-2 px-2 py-1 rounded-pill border border-warning`
                    }
                    to={`view/${values.book}`}
                  >
                   {values.book}
                  </NavLink>
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? `${Classess.hover} ${Classess.active} mx-2 px-2 py-1 rounded-pill border border-warning`
                : `${Classess.hover} ${Classess.unActive} mx-2 px-2 py-1 rounded-pill border border-warning`
            }
            to="book"
          >
            book
          </NavLink>
        </Col>

        <Col>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? `${Classess.hover} ${Classess.active} mx-2 px-2 py-1 rounded-pill border border-warning`
                : `${Classess.hover} ${Classess.unActive} mx-2 px-2 py-1 rounded-pill border border-warning`
            }
            to="quran"
          >
            quran
          </NavLink>
        </Col>
        <Col>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? `${Classess.hover} ${Classess.active} mx-2 px-2 py-1 rounded-pill border border-warning`
                : `${Classess.hover} ${Classess.unActive} mx-2 px-2 py-1 rounded-pill border border-warning`
            }
            to="subject"
          >
            subject
          </NavLink>
        </Col>
      </Row>
    </Container>
  );
};
