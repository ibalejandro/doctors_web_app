import React, {useState} from 'react'

function CallWidget({onCall, onHangUp}) {

	const [numberToCall, setNumberToCall] = useState("")

    return (
        <div>
        	<br />
            <h2>1. Llamada para confirmar videollamada</h2>
        	<input type="text" onChange={(e) => {setNumberToCall(e.target.value)}} value={numberToCall} placeholder="Número de contacto"></input>
			<button onClick={() => {onCall(numberToCall)}} style={{marginLeft: '0.2em', marginRight: '1em'}}>Llamar</button>
			<button onClick={onHangUp}>Colgar</button>
        </div>
    );
}

export default CallWidget;
