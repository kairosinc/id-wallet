import React, { Component } from "react";

const options = [
    "All",
    10,
    20,
    40,
    60
];

const PaginationSize = props => (
    <form className="mx-auto mr-sm-0">
        <div className="d-flex input-group ">
            <div className="input-group-prepend">
                <label className="input-group-text">Rows</label>
            </div>
            <select className="custom-select"
                id="itemSelect"
                onChange={props.changeItemsPerPage}
                value={props.selected}
            >
                {options.map(option => (
                    <option
                        key={option}
                        value={option}
                    >
                        {option}
                    </option>
                ))}
            </select>
        </div>
    </form>
);

export default PaginationSize;