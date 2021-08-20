import React from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';

// Components
import { EmployeeApp } from './employeeApp'
import { EmployeeNoApp } from './employeeNoApp'

export const Main = () => {

    let user_type = JSON.parse(localStorage.getItem('type'));
    let application_status = JSON.parse(localStorage.getItem('applicationStatus'));



    return (

        <div>
            <Container fluid className="m-0 w-100 d-flex justify-content-center align-items-center flex-column ">
                {user_type === 2 && application_status === 1 &&
                    <EmployeeApp />
                }
                {user_type === 2 && application_status === 3 &&
                    <EmployeeNoApp />
                }
            </Container>
        </div >

    );
}