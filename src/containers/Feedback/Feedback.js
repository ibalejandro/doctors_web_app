import React, {useState} from "react";
import FeedbackCard from "../../components/FeedbackCard/FeedbackCard";
import Modal from "../../components/Modal/Modal";
import FeedbackWidget from "../../components/FeedbackWidget/FeedbackWidget";
import CasesAPI from "../../services/CasesAPI";

const Feedback = () => {

    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState("¿Qué piensas de Doctores 5vid?");
    const [feedback, setFeedback] = useState('');
    const [body, setBody] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [disableSend, setDisableSend] = useState(false);
    const [buttonText, setButtonText] = useState("Enviar");

    const giveFeedbackHandler = () => {
        setShowModal(true);
    };

    const cancelGivingFeedbackHandler = () => {
        setShowModal(false);
        setErrorMessage('');
    };

    const feedbackChangeHandler = (content) => {
        setFeedback(content);
    };

    const sendFeedbackHandler = async () => {
        if (!body) {
            if (feedback.trim() !== '') {
                setDisableSend(true);
                const feedbackResult = await CasesAPI.sendFeedback(feedback.trim());
                if (!feedbackResult.sendMessage) {
                    setTitle("¡Gracias por ayudarnos a mejorar!");
                    setBody("Hemos recibido tus comentarios. Tu opinión es muy importante para que podamos " +
                        "brindar una mejor experiencia a los médicos voluntarios.");
                    setButtonText("Entendido");
                    setErrorMessage('');
                } else {
                    setErrorMessage(feedbackResult.sendMessage);
                }
                setDisableSend(false);
            }
        } else {
            resultUnderstoodHandler();
        }
    };

    const resultUnderstoodHandler = () => {
        setShowModal(false);
        setTitle("¿Qué piensas de Doctores 5vid?");
        setFeedback('');
        setBody('');
        setButtonText("Enviar");
        setErrorMessage('');
        setDisableSend(false);
    };

    return (
        <div>
            <Modal
                show={showModal}>
                <FeedbackCard
                    title={title}
                    feedback={feedback}
                    body={body}
                    buttonText={buttonText}
                    errorMessage={errorMessage}
                    disableSend={disableSend}
                    onCancelClicked={cancelGivingFeedbackHandler}
                    onFeedbackChanged={feedbackChangeHandler}
                    onSendClicked={sendFeedbackHandler}/>
            </Modal>
            <FeedbackWidget onGiveFeedbackClick={giveFeedbackHandler}/>
        </div>
    );
};

export default Feedback;