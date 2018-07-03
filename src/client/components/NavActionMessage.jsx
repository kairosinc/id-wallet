import React from "react";

const NavActionMessage = ({message, href, target, actionCall}) => (
    <div className="d-flex flex-row flex-wrap align-items-center">
        <div className="mx-auto mx-lg-0 pr-md-2 text-white text-center">{message}</div>
        <div className="mx-auto pt-2 pt-md-0">
            <a href={href} target={target} rel="noopener noreferrer"
               className="btn text-bold text-uppercase text-white bg-orange px-sm-5">
                {actionCall}
            </a>
        </div>
    </div>
);

export default NavActionMessage;