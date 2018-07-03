import React from "react";

import fontawesome from "@fortawesome/fontawesome";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import far from "@fortawesome/fontawesome-free-regular";
import fas from "@fortawesome/fontawesome-free-solid";

// icons default to font-awesome-solid to specify solid or regular use icon={["<far || fas>","<icon-name>"]} in icon props

fontawesome.library.add(far, fas);

const Icon = props => (
  <FontAwesomeIcon
    icon={props.icon}
    size={props.size}
    className={props.className}
    transform={props.transform}
  />
);

export default Icon;
