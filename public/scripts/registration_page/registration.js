'use strict';

import { find_node_bottom_up, find_node_childrens } from '/scripts/registration_page/functions.js';

const username = document.getElementById('username');
const password = document.getElementById('password');
const confirm_password = document.getElementById('confirm_password');
const submit_button = document.getElementById('submit');

submit_button.addEventListener('click', (event) => {
    // check if the passwords are equals
    console.log('check');
    if (!password.value || password.value != confirm_password.value) {
        alert("the inserted passwords doesn't match!");
        password.value = null;
        confirm_password.value = null;
        event.preventDefault();
    }
});

// popup controls
const list_popups = document.getElementsByName('popup_block');

function show_popup (event) {
    let main_element = find_node_bottom_up(event, 'div', 'popup_block');

    if(main_element) {
        let popup_span = find_node_childrens(main_element.childNodes, 'span', 'popup_span');
        
        if(popup_span) {
            popup_span.classList.add('display_popup');
        }
    }
}

function hide_popup (event) {
    let main_element = find_node_bottom_up(event, 'div', 'popup_block');

    if(main_element) {
        let popup_span = find_node_childrens(main_element.childNodes, 'span', 'popup_span');
        
        if(popup_span) {
            popup_span.classList.remove('display_popup');
        }
    }
}

list_popups.forEach(element => {
    element.addEventListener('mouseover', show_popup); 
    element.addEventListener('mouseout', hide_popup);  
});
