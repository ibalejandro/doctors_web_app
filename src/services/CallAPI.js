const voximplant = window.VoxImplant.getInstance();

class CallAPI {

    static async setUp() {
        let callEnvAuthorized = false;
        try {
            await voximplant.init({
                micRequired: true,
                progressTone: true,
                progressToneCountry: "US",
                showDebugInfo: false
            });
            // SDK was initialized.
            console.log("SDK initialized.")
            voximplant.addEventListener(window.VoxImplant.Events.ConnectionClosed, () => {
                // Connection was closed.
                console.log("Connection closed.")
            });
            try {
                await voximplant.connect();
                // Connection was established successfully.
                console.log("Connection established successfully.")
                try {
                    await voximplant.login(process.env.REACT_APP_VOXIMPLANT_USERNAME,
                        process.env.REACT_APP_VOXIMPLANT_PASSWORD);
                    // Authorization was successful.
                    callEnvAuthorized = true;
                    console.log("Authorization succeeded.")
                } catch (e) {
                    // Authorization failed.
                    console.error("Authorization failed.")
                }
            } catch (e) {
                // Connection failed.
                console.error("Connection failed.")
            }
        } catch (e) {
            // SDK initialization failed.
            console.error("SDK initialization failed.")
        }

        return callEnvAuthorized;
    }

    static makeCall(call, numberToCall, myCallback) {
        let callAndMessage = {call: null, callMessage: null};
        console.log(call);
        myCallback("hola amigo");
        /*
        call = voximplant.call(numberToCall);

        call.addEventListener(window.VoxImplant.CallEvents.Connected, event => {
             // Call was connected successfully.
            console.log("Call connected.");
            callAndMessage.call = call;
            callAndMessage.callMessage = "Conectado";
            return callAndMessage;
        });
        call.on(window.VoxImplant.CallEvents.Disconnected, event => {
            // Call was disconnected.
            console.log("Call disconnected.");
            myCallback("disconnected");
        });
        call.addEventListener(window.VoxImplant.CallEvents.Failed, event => {
            // Call failed.
            call = null
            console.log("Call failed.");
            callAndMessage.call = null;
            callAndMessage.callMessage = "Llamada finalizada";
            return callAndMessage;
        });
        call.addEventListener(window.VoxImplant.CallEvents.ProgressToneStart, event => {
            // Progress tone playback started.
            console.log("Call ProgressTone started.");
            myCallback("progresstonestart");
        });
        call.on(window.VoxImplant.CallEvents.ProgressToneStop, event => {
            // Progress tone playback stopped.
            console.log("Call ProgressTone stopped.");
        });
         */
    }

    /*
    static hangUp() {
        if (call != null) {
            console.log("Hanging up the call.")
            call.hangup()
            call = null
        }
    }
    */
}

export default CallAPI;