const voximplant = window.VoxImplant.getInstance();

class CallAPI {

    static async setUp() {
        let callEnvAuthorized = false;
        if (voximplant.getClientState() !== window.VoxImplant.ClientState.LOGGED_IN) {
            try {
                await voximplant.init({
                    micRequired: true,
                    progressTone: true,
                    progressToneCountry: "US",
                    showDebugInfo: false
                });
                // SDK was initialized.
                console.log("SDK initialized.")
                voximplant.on(window.VoxImplant.Events.ConnectionClosed, () => {
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
        } else {
            callEnvAuthorized = true;
            console.log("Authorization already succeeded.")
        }

        return callEnvAuthorized;
    }

    static makeCall(callRef, numberToCall, reportCallEvent) {
        if (!numberToCall.startsWith("+57")) {
            numberToCall = "+57" + numberToCall;
        }

        callRef.call = voximplant.call(numberToCall);

        callRef.call.on(window.VoxImplant.CallEvents.Connected, event => {
            // Call was connected successfully.
            console.log("Call connected.");
            reportCallEvent("Conectado");
        });
        callRef.call.on(window.VoxImplant.CallEvents.Disconnected, event => {
            // Call was disconnected.
            console.log("Call disconnected.");
            callRef.call = null;
            reportCallEvent("Llamada finalizada");
        });
        callRef.call.on(window.VoxImplant.CallEvents.Failed, event => {
            // Call failed.
            console.log("Call failed.");
            callRef.call = null;
            reportCallEvent("Llamada finalizada");
        });
        callRef.call.on(window.VoxImplant.CallEvents.ProgressToneStart, event => {
            // Progress tone playback started.
            console.log("Call ProgressTone started.");
        });
        callRef.call.on(window.VoxImplant.CallEvents.ProgressToneStop, event => {
            // Progress tone playback stopped.
            console.log("Call ProgressTone stopped.");
        });
    }

    static hangUp(callRef) {
        if (callRef.call !== null) {
            callRef.call.hangup();
            console.log("Call hanged up.")
        }
    }
}

export default CallAPI;