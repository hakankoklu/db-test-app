/**
 * Copyright 2015 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';


// Shortcuts to DOM Elements.
var addDataButton = document.getElementById('add-data-button');
var readDataButton = document.getElementById('read-data-button')
var userNameField = document.getElementById('user-name');
var userEmailField = document.getElementById('user-email');

/**
 * Saves a new post to the Firebase DB.
 */
// [START write_fan_out]
function addUser() {
  // A post entry.
    var username = userNameField.value;
    var email = userEmailField.value;
    var userRef = firebase.database().ref('users/' + username);
    console.log("Writing " + username + " " + email);
    userRef
        .set({
            username: username,
            email: email
        });
}

function readData() {
    firebase.database().ref().once('value').then(function(snapshot) {
        console.log(snapshot.val());
    });
}

// Bindings on load.
window.addEventListener('load', function() {
    addDataButton.addEventListener('click', addUser);
    readDataButton.addEventListener('click', readData);
    }, false);