/*
 * Filename: script.js
 * Author: Steven Gov
 * Date: 9/29/19
 * Purpose: Main javascript file containing all core functions
 */
 
// Default format for the clock time displayed
 const DEFAULT_TIME = "00 : 00 : 00";

// Indexes for the cells in the table
const TRIAL_NUM_CELL = 0;
const STARTING_ELAPSED_TIME_CELL = 1;
const TOTAL_ELAPSED_TIME_CELL = 2;
const TRIAL_TIME_CELL = 3;
const LATITUDE_CELL = 4;
const LONGITUDE_CELL = 5;
const STARTING_TIME_ZONE_CELL = 6;
const ENDING_TIME_ZONE_CELL = 7;

// Variables that represent total duration of time calculated
let elapsedTime = {
    seconds : 0,
    minutes : 0, 
    hours : 0
 }

// Variables that represent time within a single trial (start-stop)
 let trialTime = {
    seconds : 0,
    minutes : 0,
    hours : 0
 }

// Variables of time values in string format for elapsed and trial times
let displayTime = {
    elapsed : {
        seconds : 0,
        minutes : 0,
        hours : 0,
        formatInfo : function() {
            return displayTime.elapsed.hours + " : " + 
                displayTime.elapsed.minutes + " : " + 
                displayTime.elapsed.seconds;
        }
    },
    trial : {
        seconds : 0,
        minutes : 0,
        hours : 0,
        formatInfo : function() {
            return displayTime.trial.hours + " : " + 
                displayTime.trial.minutes + " : " + 
                displayTime.trial.seconds;
        }
    }
}

// Position variables for Geolocation API
let longitude = null;
let latitude = null;

// Used for setInterval() function
let interval = null;

// Variable that shows status of stopwatch
let timerOn = false;

// Used to identify the last row in the table or number of trials
let trialNum = 1;

/**
 * Basic logic of a stopwatch - consistently keeps track of time
 */
function stopWatch(){

    // Countinously adds a second, keeps track of time
    trialTime.seconds++;
    elapsedTime.seconds++;

    // Reformats the elapsedTime to displayTime format 
    convertTimeForDisplay( elapsedTime, displayTime.elapsed );

    // Converts time values so they don't go above 60
    convertToTimeFormat( elapsedTime );
    convertToTimeFormat( trialTime );

    // Directly change the display clock
    var display = document.getElementById( 'display' );
    display.innerHTML = displayTime.elapsed.formatInfo();
 
    // Constantly update the time on the table
    var table = document.getElementsByTagName( 'table' )[0];
    table.rows[trialNum].cells[TOTAL_ELAPSED_TIME_CELL].innerHTML = display.innerHTML;
    
}


/**
 * Functionality of the start/stop button
 * Used to begin and stop stopwatch
 */
function startStop(){

    // Starting the timer by clicking the start button
    if( !timerOn ) {

        //Start the stopwatch (by calling the setInterval() function)
        interval = window.setInterval( stopWatch, 1000 );
        document.getElementById( 'startStopBtn' ).innerHTML = "Stop";
        timerOn = true;
        addInfo();
          
        // Reset trial time after each trial 
        trialTime.seconds = 0;
        trialTime.minutes = 0;
        trialTime.hours = 0;

        // Request location only once to obtain latitude and longitude 
        if( latitude == null && longitude == null ) {
            geoFindMe();
        }

    }

    // Stopping the timer and trial time updates in table by clicking stop button 
    else{

        // Resets the button back to the "start" option and stops the clock
        window.clearInterval( interval );
        document.getElementById( 'startStopBtn' ).innerHTML = "Start";
        timerOn = false;

        // Reformats to trialTime to displayTime format
        convertTimeForDisplay( trialTime, displayTime.trial );

        // Assign trial time cell in clock format
        var table = document.getElementsByTagName( 'table' )[0];
        table.rows[trialNum].cells[TRIAL_TIME_CELL].innerHTML = displayTime.trial.formatInfo();

        // Puts the latitude and longitude in the cells
        table.rows[trialNum].cells[LATITUDE_CELL].innerHTML = latitude;
        table.rows[trialNum].cells[LONGITUDE_CELL].innerHTML = longitude;

        // Update the time zone the table
        table.rows[trialNum].cells[ENDING_TIME_ZONE_CELL].innerHTML = new Date();

        // Populates all information from the current trial into localStorage
        populateStorage( trialNum );

        /*
         * Keeps the total elapsed time updated on the last row of the table
         * Stopping the trial also increases total trial numbers
         */
        trialNum++; 

    }

}

/**
 * Function to reset the stopwatch and table values/data
 * Assumtption: Reset button cleared everything and started application from stratch
 */
function reset(){

    // Resets all variables to original values
    window.clearInterval( interval );
    elapsedTime.seconds = 0;
    elapsedTime.minutes = 0;
    elapsedTime.hours = 0;
    trialNum = 1;
    trialNum = 1;
    document.getElementById( 'display' ).innerHTML = DEFAULT_TIME;
    document.getElementById( 'startStopBtn' ).innerHTML = "Start";
    
    // Delete the table's entries except for top
    var table = document.getElementsByTagName( 'table' )[0];
    for( var i = table.rows.length - 1; i > 0; i-- ) {
        table.deleteRow(i);
    }

    // Clears entire local storage to completely reset data
    localStorage.clear();

}

/**
 * Adding information to a new row in the existing table
 */
function addInfo() {
    
    // Allows to directly change the display clock
    var display = document.getElementById( 'display' ).innerHTML;

    // Get Table info and insets a new row at the bottom of the table
    var table = document.getElementsByTagName( 'table' )[0];
    var newRow = table.insertRow( trialNum );

    // Adding cells to the newly created row
    newRow.insertCell( TRIAL_NUM_CELL ).innerHTML = trialNum;
    newRow.insertCell( STARTING_ELAPSED_TIME_CELL ).innerHTML = display;
    newRow.insertCell( TOTAL_ELAPSED_TIME_CELL ).innerHTML = display; 
    newRow.insertCell( TRIAL_TIME_CELL ).innerHTML = DEFAULT_TIME;   
    newRow.insertCell( LATITUDE_CELL ).innerHTML = latitude;
    newRow.insertCell( LONGITUDE_CELL ).innerHTML = longitude;

    // Assumption: time zone displayed entire date, time, and time zone 
    newRow.insertCell( STARTING_TIME_ZONE_CELL ).innerHTML = new Date();
    newRow.insertCell( ENDING_TIME_ZONE_CELL ).innerHTML = 0;
    
}