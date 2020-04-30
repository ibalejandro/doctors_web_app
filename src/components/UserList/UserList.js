import React, {useState} from 'react'
import PropTypes from 'prop-types';
import UserReportCard from "../UserReportCard/UserReportCard";
import {Accordion, Col, InputGroup, Row} from 'react-bootstrap';
import {FiSearch} from "react-icons/fi";

import styled from "styled-components";

const SearchContainer = styled.div`
  width: 100%;
  position: relative;
  border: none;
  background-color: #F4EBF4;
  display: flex;
  border-radius: 5px;
  padding: 10px;
`

const SearchInput = styled.input`
  width: 100%;
  border: none;
  color: #8c6380;
  background-color: #F4EBF4;
  &::placeholder {
    color: #8c6380;
  }
  &:focus {
    outline: none;
  }
`

const SearchIconContainer = styled.div`
  padding: 0 10px 0 5px;
`

function UserList({reports, reportViewers}) {

    const [filter, setFilter] = useState("")

    const filterNorm = filter.trim().toLowerCase()

    const userReport = reports
        .filter((report) => filterNorm.length > 0 ? report.name.trim().toLowerCase().includes(filterNorm) : true)
        .map((report, index) => {
            let isViewing = false;
            let viewer = null
            for (const key of reportViewers) {
                if (key.id === report.id) {
                    isViewing = true;
                    viewer = key
                }
            }

            return <UserReportCard
                {...report}
                index={index}
                key={report.id}
                disabled={isViewing}
                viewer={viewer}
            />;
        });

    return (
        <React.Fragment>
            <InputGroup className="mb-4 mt-5">
                <SearchContainer>
                    <SearchIconContainer><FiSearch size={25} color={"#8c6380"}/></SearchIconContainer>
                    <SearchInput placeholder={"Buscar reporte"} onChange={(e) => setFilter(e.target.value)}
                                 value={filter}/>
                </SearchContainer>
            </InputGroup>
            <Row className="mb-3" style={{color: "#634357"}}>
                <Col xs={4} md={3}>Nombre</Col>
                <Col>Edad</Col>
                <Col>Revisando ahora</Col>
            </Row>
            <Accordion defaultActiveKey="0">
                {userReport}
            </Accordion>
        </React.Fragment>

    );
}

UserList.propTypes = {
    reports: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        age: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        city: PropTypes.string.isRequired,
        score: PropTypes.object.isRequired,
        diagnosedWith: PropTypes.object,
        symptoms: PropTypes.object,
    })),
    reportViewers: PropTypes.array,
    onViewReport: PropTypes.func
};

export default UserList;
