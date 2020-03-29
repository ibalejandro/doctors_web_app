import React, {useState} from 'react'

function VideoCallWidget({onVideoCall}) {

	const [citizenId, setCitizenId] = useState("")

    return (
        <div>
        	<br />
            <h2>2. Videollamada</h2>
        	<input type="text" onChange={(e) => {setCitizenId(e.target.value)}} value={citizenId} placeholder="Cédula del usuario"></input>
			<button onClick={() => {onVideoCall(citizenId)}} style={{marginLeft: '0.2em'}}>Iniciar videollamada</button>
        </div>
    );
}

export default VideoCallWidget;
