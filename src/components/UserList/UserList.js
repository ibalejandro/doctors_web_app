import React, {useState} from 'react'
import UserReportCard from "../UserReportCard/UserReportCard";
import {Accordion, FormControl, InputGroup} from 'react-bootstrap';
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

function UserList({reports}) {

    const [filter, setFilter] = useState("")

    const filterNorm = filter.trim().toLowerCase()

    const userReport = reports
        .filter((report) => filterNorm.length > 0 ? report.name.trim().toLowerCase().includes(filterNorm) : true)
        .map((report, index) => {
            return <UserReportCard {...report} index={index} key={report.id}/>;
        });

    return (
        <React.Fragment>
            <InputGroup className="mb-4">
                <SearchContainer>
                    <SearchIconContainer><FiSearch size={25} color={"#8c6380"}/></SearchIconContainer>
                    <SearchInput placeholder={"Buscar reporte"} onChange={(e) => setFilter(e.target.value)}
                                 value={filter}/>
                </SearchContainer>
            </InputGroup>
            <Accordion defaultActiveKey="0">
                {userReport}
            </Accordion>
        </React.Fragment>

    );
}

export default UserList;
