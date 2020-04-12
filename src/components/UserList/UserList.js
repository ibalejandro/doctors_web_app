import React from 'react'
import UserReportCard from "../UserReportCard/UserReportCard";
import { Accordion, FormControl, InputGroup } from 'react-bootstrap';
import { MdSearch } from "react-icons/md";

function UserList({reports}) {
    const userReport = reports.map((report, index) => {
        const r = report[0];
    	return <UserReportCard {...r} index={index} key={r.citizenId} />;
    });

    return (
        <React.Fragment>
            <InputGroup className="mb-4">
                <InputGroup.Prepend>
                    <InputGroup.Text>
                        <MdSearch />
                    </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl />
            </InputGroup>
            <Accordion defaultActiveKey="0">
                {userReport}
            </Accordion>
        </React.Fragment>
        
    );
}

export default UserList;
