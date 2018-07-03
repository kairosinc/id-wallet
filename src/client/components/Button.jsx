import React from "react";

const Button = (props) => (
    <button className={props.classList} onClick={props.onClick}>{props.children}</button>
);

export const Cancel = (props) => (
    <Button classList="btn btn-secondary border-dark text-bold text-uppercase px-5" onClick={props.onClick}>
        Cancel
    </Button>
);

export const Close = (props) => (
    <Button classList="btn btn-secondary border-dark text-bold text-uppercase px-5" onClick={props.onClick}>
        Close
    </Button>
);

export const Success = (props) => (
    <Button classList="btn btn-success text-uppercase text-bold px-5" onClick={props.onClick}>
        {props.btnValue}
    </Button>
);


export const SuccessOutline = (props) => (
    <Button classList="btn btn-outline-success text-uppercase text-bold px-5" onClick={props.onClick}>
        {props.btnValue}
    </Button>
);