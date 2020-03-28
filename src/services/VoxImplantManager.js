const voximplant = window.VoxImplant.getInstance();
const username = "cduser@covidiagnostico.covidiagnostico.voximplant.com";
const password = "covidglobalhackathon";

class VoxImplantManager {
	static async setUp() {
        try {
	        await voximplant.init({micRequired: true, progressTone: true, progressToneCountry: "US", showDebugInfo: false});
	        // SDK initialized.
	        console.log("SDK initialized.")
	        voximplant.addEventListener(window.VoxImplant.Events.ConnectionClosed, () => {
	            // Connection was closed.
	            console.log("Connection was closed.")
	        });
	        try {
	            await voximplant.connect();
                // Connection was established successfully.
                console.log("Connection was established successfully.")
                try {
					 await voximplant.login(username, password);
					 // Authorization success.
					 console.log("Authorization success.")
					 /*
					 const call = voximplant.call('*');
					 call.addEventListener(window.VoxImplant.CallEvents.Connected, event => {
					 // event - the instance of VoxImplant.CallEvents.Connected class,
					 // use event.call to get the instance of VoxImplant.Call for this call
					 // call was connected succesfully
					 console.log("Connected")
					});
					call.addEventListener(window.VoxImplant.CallEvents.Disconnected, event => {
					 // event - the instance of VoxImplant.CallEvents.Disconnected class,
					 // use event.call to get the instance of VoxImplant.Call for this call
					 // call was disconnected
					 console.log("Disconnected")
					});
					call.addEventListener(window.VoxImplant.CallEvents.Failed, event => {
					 // event - the instance of VoxImplant.CallEvents.Failed class, use
					 // event.call to get the instance of VoxImplant.Call for this call, or
					 // event.code and event.reason to get the status code and the reason of
					 // the call failure call failed
					 console.log("Failed")
					 console.log(event.code)
					});
					call.addEventListener(window.VoxImplant.CallEvents.ProgressToneStart, event => {
					 // event - the instance of VoxImplant.CallEvents.ProgressToneStart class,
					 // use event.call to get the instance of VoxImplant.Call for this call
					 // Event dispatched when progress tone playback starts
					 console.log("ProgressToneStart")
					});
					call.addEventListener(window.VoxImplant.CallEvents.ProgressToneStop, event => {
					 // event - the instance of VoxImplant.CallEvents.ProgressToneStop class,
					 // use event.call to get the instance of VoxImplant.Call for this call
					 // Event dispatched when progress tone playback stops
					 console.log("ProgressToneStop")
					});
					*/
				} catch (e) {
				 // Authorization failure.
				 console.error("Authorization failure.")
				}
	        } catch (e) {
	            // Connection failed.
	             console.error("Connection failed.")
	        }
	    } catch (e) {
	     // SDK init failure.
	     console.error("SDK init failure.")
	    }
    }

    static makeCall(numberToCall) {
    	console.log("Making call...")
    	const call = voximplant.call(numberToCall);
		call.addEventListener(window.VoxImplant.CallEvents.Connected, event => {
		 // event - the instance of VoxImplant.CallEvents.Connected class,
		 // use event.call to get the instance of VoxImplant.Call for this call
		 // call was connected succesfully
		});
		call.addEventListener(window.VoxImplant.CallEvents.Disconnected, event => {
		 // event - the instance of VoxImplant.CallEvents.Disconnected class,
		 // use event.call to get the instance of VoxImplant.Call for this call
		 // call was disconnected
		});
		call.addEventListener(window.VoxImplant.CallEvents.Failed, event => {
		 // event - the instance of VoxImplant.CallEvents.Failed class, use
		 // event.call to get the instance of VoxImplant.Call for this call, or
		 // event.code and event.reason to get the status code and the reason of
		 // the call failure call failed
		});
		call.addEventListener(window.VoxImplant.CallEvents.ProgressToneStart, event => {
		 // event - the instance of VoxImplant.CallEvents.ProgressToneStart class,
		 // use event.call to get the instance of VoxImplant.Call for this call
		 // Event dispatched when progress tone playback starts
		});
		call.addEventListener(window.VoxImplant.CallEvents.ProgressToneStop, event => {
		 // event - the instance of VoxImplant.CallEvents.ProgressToneStop class,
		 // use event.call to get the instance of VoxImplant.Call for this call
		 // Event dispatched when progress tone playback stops
		});
    }
}
export default VoxImplantManager
	
/*
const initVoxi = async () => {
    try {
        await voximplant.init();
        // SDK initialized.
        console.log("SDK initialized.")
        voximplant.addEventListener(wivoxi.Events.ConnectionClosed, () => {
            // Connection was closed.
            console.log("Connection was closed.")
        });
        try {
            await voximplant.connect();
                // Connection was established successfully.
                console.log("Connection was established successfully.")
        } catch (e) {
            // Connection failed.
             console.log("Connection failed.")
        }
    } catch (e) {
     // SDK init failure.
     console.log("SDK init failure.")
    }
}
initVoxi();
    static async getUserReports() {
        try {
            const response = await axios.get(REPORTS_API_URL + '/api/reports');
            return response.data
        } catch (error) {
            console.error(error);
            return []
        }
    }
}

export default ReportsAPI
*/