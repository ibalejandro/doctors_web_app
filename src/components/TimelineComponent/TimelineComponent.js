import  React from 'react';
import PropTypes from 'prop-types';
import './TimelineComponent.css';
import styled from "styled-components";
import MoonLoader from "react-spinners/MoonLoader";
import {StyledTimeline} from "./StyledTimeline";

const TimelineContainer = styled.div`
	
`;

const Timeline = ({items = [], onClickState, updatingResultMessage, caseStateChangeLoading}) => {

	const totalItems = items.length;
	const numberOfActiveItems = items.filter(item => item.active).length;
	const progressBarWidth
		= Math.max(totalItems > 1 ? (numberOfActiveItems - 1) / (totalItems - 1) * 100 : 0, 0);
	let timelineStatus;
	if (!caseStateChangeLoading) {
		timelineStatus = <p className="text-center">{updatingResultMessage}</p>;
	} else {
		timelineStatus = (
			<StyledTimeline>
				<MoonLoader size={40} color={"#9B70FF"} loading={caseStateChangeLoading} />
			</StyledTimeline>
		);
	}

	return (
		<div>
			{timelineStatus}
			<TimelineContainer className="timeline">
				<div className="timeline-progress" style={{ width: `${progressBarWidth}%`}}></div>
				<div className="timeline-items">
					{items.map((item, i) => (
						<div
							key={i}
							className={"timeline-item" + (item.active ? ' active' : '')}
							onClick={() => {onClickState(i)}}>
							<div className="timeline-content">
								{item.name}
							</div>
						</div>
					))}
				</div>
			</TimelineContainer>
		</div>
	)
}

Timeline.propTypes = {
	items: PropTypes.array
};

export default Timeline;
