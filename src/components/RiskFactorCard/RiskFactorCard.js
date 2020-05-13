import React from 'react';
import {Card, Form} from "react-bootstrap";

const RISK_LEVELS = [
    {
        level: 'low',
        label: 'Caso poco probable para COVID-19'
    },
    {
        level: 'medium',
        label: 'Caso probable para COVID-19'
    },
    {
        level: 'high',
        label: 'Caso muy probable para COVID-19'
    }
]

const RiskFactorCard = ({savedResultMessage, level, onLevelChanged, onSave, loadingRiskLevel}) => {
    return (
        <Card className={"mb-4 mt-4"}>
            <Card.Header><strong>Clasificacion de riesgo</strong></Card.Header>
            <Card.Body>
                <Form>
                    <p>
                        Para mejorar nuestro triage virtual es muy importante que nos retroalimentes con tu concepto.
                        Por favor, clasifica el caso en alguna de las siguientes categorías:
                    </p>
                    {
                        RISK_LEVELS.map((factor) => (
                            <div key={`risk-level-${factor.level}`} className="mb-3">
                                <Form.Check
                                    name={'risk-level-assessment'}
                                    type={'radio'}
                                    id={`risk-level-${factor.level}`}
                                    value={factor.level}
                                    label={`${factor.label}`}
                                    checked={factor.level === level}
                                    onChange={(e) => {
                                        onLevelChanged(e.target.value)
                                    }}
                                />
                            </div>))
                    }
                    <p style={{color:"#b4b4b4"}}>
                        * Esta información no será compartida con el usuario y solamente será utilizada para el mejoramiento continuo de 5vid.
                    </p>
                    <div className="float-right flex-column">
                        <button
                            disabled={!level}
                            onClick={onSave}
                            type="button"
                            className="btn btn-primary mt-4"
                        >
                            <span>{loadingRiskLevel ? "Guardando..." : "Guardar"}</span>
                        </button>
                        <div style={{textAlign:"center"}}>{savedResultMessage}</div>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default RiskFactorCard;
