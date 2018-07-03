import React, { Component } from "react";
import Icon from "./Icon";

const PaginationNav = props => {
    const hasPrevious = (props.currentPage !== 1);
    const hasNext = (props.currentPage !== props.pageNumbers.length);
    const prevPage = props.currentPage - 1;
    const nextPage = props.currentPage + 1;

    if (props.navStyle === "SHOW_MORE") {
        return (
            <div className="mx-auto ml-sm-0">
                <nav aria-label="Transactions Pagination">
                    <ul className="pagination mb-0">
                        {hasNext && (
                            <li className="page-item page-link border-0" aria-label="Show More"
                                onClick={props.handleClick} data-pagenumber={nextPage}>
                                <span aria-hidden="true" className="text-success">
                                    <Icon icon="caret-down" className="mr-1"/>Show more
                                </span>
                            </li>)
                        }
                        {hasPrevious && (
                            <li className="page-item page-link border-0" aria-label="Show Less"
                                onClick={props.handleClick} data-pagenumber={prevPage}>
                                <span aria-hidden="true" className="text-success">
                                    Show less<Icon icon="caret-up" className="ml-1"/>
                                </span>
                            </li>)
                        }
                    </ul>
                </nav>
            </div>
        )
    } else {
        return (
            <div className="mx-auto ml-sm-0">
                <nav aria-label="Transactions Pagination">
                    <ul className="pagination mb-0">
                        <li
                            className="page-item page-link border-0"
                            aria-label="Previous"
                            {...(hasPrevious && {
                                onClick: props.handleClick,
                                "data-pagenumber": prevPage
                            })}
                            {...{disabled: !hasPrevious}}
                        >
                        <span aria-hidden="true">
                        <Icon icon="angle-left"/>
                        </span>
                            <span className="sr-only">Previous</span>
                        </li>
                        {props.pageNumbers.map(number => (
                            <li key={number}
                                data-pagenumber={number}
                                className={props.currentPage === number ? "page-item border-0 active" : "page-item border-0"}
                                onClick={props.handleClick}
                            >
                                <a className="page-link border-0"> {number} </a>
                            </li>
                        ))}
                        <li
                            className="page-item page-link border-0"
                            aria-label="Next"
                            {...(hasNext && {
                                onClick: props.handleClick,
                                "data-pagenumber": nextPage
                            })}
                            {...{disabled: !hasNext}}
                        >
                        <span aria-hidden="true">
                         <Icon icon="angle-right"/>
                        </span>
                            <span className="sr-only">Next</span>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    }
}

export default PaginationNav;
