import React , {useState} from 'react'

function CallWidget({onCall, onHangUp}) {

	const [numberToCall, setNumberToCall] = useState("")

    return (
        <div>
        	<br />
        	<input type="text" onChange={(e) => {setNumberToCall(e.target.value)}} value={numberToCall}></input>
			<button onClick={() => {onCall(numberToCall)}}>Llamar</button>
			<br />
			<br />
			<button onClick={onHangUp}>Colgar</button>
        </div>
    );
}

export default CallWidget;
