/*
 * Filename: helper.js
 * Author: Steven Gov
 * Date: 9/29/19
 * Purpose: This javascript file contains helper methods used in script.js
 */

/**
 * Allows time to be displayed in String and maintain clock format 
 * with leading 0s
 *
 * @param time in integer values that needs to convert to String for display
 * @param displayTime String format of time to display on clock
 */
function convertTimeForDisplay( time, displayTime ) {
    if( time.seconds < 10 ) {
        displayTime.seconds = "0" + time.seconds.toString();
    } else {
        displayTime.seconds = time.seconds;
    }

    if( time.minutes < 10 ) {
        displayTime.minutes = "0" + time.minutes.toString();
    } else {
        displayTime.minutes = time.minutes;
    }

    if( time.hours < 10 ) {
        displayTime.hours = "0" + time.hours.toString();
    } else {
        displayTime.hours = time.hours;
    }

}

/**
 * Converts time to maintain correct time format
 * 
 * @param time constantly converts seconds to minutes to hours
 * 		  without reaching above 59
 */
function convertToTimeFormat( time ) {
	if( time.seconds == 59 ) {
        time.seconds = -1;
        time.minutes++;

        if( time.minutes == 59 ) {
            time.minutes = -1;
            time.hours++;
        }
    }
}

/**
 * Geolocation API functionality for obtaining latitude and longitude
 */
function geoFindMe() {

  const status = document.querySelector('#status');
  const mapLink = document.querySelector('#map-link');

  mapLink.href = '';
  mapLink.textContent = '';

  function success(position) {
    latitude  = position.coords.latitude;
    longitude = position.coords.longitude;

    status.textContent = '';
    mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
    mapLink.textContent = `Latitude: ${latitude}, Longitude: ${longitude}`;
  }

  function error() {
    status.textContent = 'Unable to retrieve your location';
  }

  // Latitude and longitude could not be found
  latitude = -1;
  longitude = -1;

  if (!navigator.geolocation) {
    status.textContent = 'Geolocation is not supported by your browser';
  } else {
    status.textContent = 'Locating...';
    navigator.geolocation.getCurrentPosition(success, error);
  }

}