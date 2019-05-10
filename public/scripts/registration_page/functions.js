'use strict';

/**
 * This function trace the tree back to the element node_name with the attribute name node_name_attr
 */
function find_node_bottom_up (event, node_name, node_name_attr) {
    let current_element = event.target;

    // Trace the tree back to the div element with the name 'popup'
    while (current_element.getAttribute("name") != node_name_attr.toLowerCase() || current_element.nodeName.toLowerCase() != node_name.toLowerCase()) {
        if (!current_element.parentNode) {
            return null; // element not found: script aborted
        }

        current_element = current_element.parentNode;
    }

    return current_element;
}

function find_node_childrens (childrens, node_name, node_name_attr) {
    // Find the correct child
    for (const child of childrens) {
        if (child.nodeName.toLowerCase() == node_name.toLowerCase() && child.getAttribute("name") == node_name_attr.toLowerCase()) {
            return child;
        }
    }

    return null;
}

export { find_node_bottom_up, find_node_childrens };