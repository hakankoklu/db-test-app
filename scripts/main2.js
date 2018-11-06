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
var readDataButton = document.getElementById('read-data-button');
var queryDataButton = document.getElementById('query-data-button');
var userNameField = document.getElementById('user-name');
var userLatField = document.getElementById('user-lat');
var userLongField = document.getElementById('user-long');
var queryLatField = document.getElementById('query-lat');
var queryLongField = document.getElementById('query-long');
var radiusField = document.getElementById('query-radius');
// random Firebase location
var locationRef = firebase.database().ref('location');
var database = firebase.database();
// Create a new GeoFire instance at the random Firebase location
var geoFire = new GeoFire(locationRef);


function addUser() {
    var username = userNameField.value;
    var latitude = parseFloat(userLatField.value);
    var longitude = parseFloat(userLongField.value);
    var myID = locationRef.push().key;

    geoFire.set(myID, [latitude, longitude])
        .then(function () {
            database.ref('users/' + myID).set(
                {
                    username: username,
                }
            ).then(function () {
                console.log("Placing " + username + " to " + latitude + ", " + longitude);
            });
        });

}

function readData() {
    database.ref().once('value').then(function(snapshot) {
        console.log(snapshot.val());
    });
}

function queryData() {
    var lat = parseFloat(queryLatField.value);
    var lon = parseFloat(queryLongField.value);
    var radius = parseFloat(radiusField.value);
    var geoQuery = geoFire.query({
        center: [lat, lon],
        radius: radius
    });
    geoQuery.on("key_entered", function(key, location, distance) {
        database.ref('users/' + key).once('value').then(function(snapshot) {
            console.log(snapshot.val().username + " is located at [" + location + "] which is within the query (" + distance.toFixed(2) + " km from center)");
        });
      });
}

// Bindings on load.
window.addEventListener('load', function() {
    addDataButton.addEventListener('click', addUser);
    readDataButton.addEventListener('click', readData);
    queryDataButton.addEventListener('click', queryData);
    }, false);