
import {Card,Row,Col} from "react-bootstrap";
import Classess from "../../../css/index.module.css";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
export default function CenterSubject() {
   const { books } = useParams();
   const [subject, setSubject] = useState([]);

   useEffect(() => {
     
     axios
       .get(`${process.env.REACT_APP_URL}/subject/${books}`)
       .then((values) => {
        
        setSubject(values.data)
        
           
         

       
       })
       .catch((err) => {
         console.log({ message: err });
       });
   }, [books]);

  return (

   
    <Row>
    
      
      {subject.map((value, key) => (
      
        <Col>
          <Card key={key} border="secondary" style={{ width: "100%" }}>
            <Card.Header className="text-center text-dark">
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? `${Classess.hover} ${Classess.active} mx-2 px-2 py-1  border border-warning`
                    : `${Classess.hover} ${Classess.unActive} mx-2 px-2 py-1 border border-warning`
                }
                to={`/subject/${books}/${value.subject_name}`}
              >
                {value.subject_name}
              </NavLink>
            </Card.Header>
          </Card>
        </Col>
      ))} 
    </Row>
  );
}


