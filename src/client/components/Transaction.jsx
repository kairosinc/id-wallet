import React from 'react';
import PropTypes from 'prop-types';

import Icon from "./Icon";

const SHOW_CONFIDENCE_LEVEL = false;

const getToFromAccountLabel = transaction => {
    switch (transaction.type) {
        case "Sent":
            return transaction.to;
        case "Received":
            return transaction.from;
        default:
            return null;
    }
}

const formatDateTime = timestamp => {
    let dateTimeStr = timestamp.split("\n");
    return (
        <div className="d-flex flex-column">
            <span className="text-uppercase">{dateTimeStr[0]}</span>
            <span>{dateTimeStr[1]}</span>
        </div>
    )
}

const getVerificationData = tran => {
    if (tran.verified) {
        const percentageDisplay = Math.round(tran.confidence * 100);
        let verificationMsg = "Verified by Kairos";
        if (SHOW_CONFIDENCE_LEVEL) {
            verificationMsg += " (" + percentageDisplay + "%)";
        }
        return (
            <div>
                <Icon icon={["fas","check-circle"]} className="mr-1 text-success" />
                 {verificationMsg}
            </div>
        );
    }
}

const Transaction = tran => (
    <tr key={tran.hash}>
        <td>
            {formatDateTime(tran.timestamp)}
        </td>
        <td>{tran.blockNumber}</td>
        <td><strong>{tran.type}</strong></td>
        <td>
            <strong>{getToFromAccountLabel(tran)}</strong><br/>
            {getVerificationData(tran)}
        </td>
        <td className="text-right">
            {tran.type === "Sent" ? "- " : ""}{tran.value.toLocaleString("en", {minimumFractionDigits: 3})} {tran.symbol}
        </td>
    </tr>
);


Transaction.propTypes = {
    hash: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    timestamp: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    blockNumber: PropTypes.number.isRequired,
    to: PropTypes.string.isRequired,
    from: PropTypes.string.isRequired,
    verified: PropTypes.bool.isRequired,
    confidence: PropTypes.number.isRequired,
    symbol: PropTypes.string,
};


export default Transaction;