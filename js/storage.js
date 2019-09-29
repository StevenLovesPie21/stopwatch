 /*
 * Filename: storage.js
 * Author: Steven Gov
 * Date: 9/29/19
 * Purpose: Javascript file used for Web Storage API functions
 */

// Checks if there is at least one data that exists inside localStorage
if( localStorage.getItem( 'trial1' ) ) {
  
  // Add all of the rows in the table again and fill the information up
  restoreTable( localStorage.getItem( 'trialNum' ) );

  // Maintains the correct number of trials stored in localStorage
  var previousTrialNum = parseInt( localStorage.getItem( 'trialNum' ), 10 );
  trialNum = previousTrialNum + 1;

  // Maintains the previous clock time on stopwatch within localStorage
  var lastTotalElapsedTimeRecorded = 
    localStorage.getItem( 'totalElapsedTime'.concat( trialNum - 1 ) );
  document.getElementById( 'display' ).innerHTML = lastTotalElapsedTimeRecorded;
  elapsedTime.seconds = localStorage.getItem( 'elapsedSeconds' );

}

/**
 * Restores the table to previous session, taken from localStorage
 *
 * @param trialNum represents previous number of trials and restores table with
 * correct number of trials
 */
function restoreTable( trialNum ) {

  // Get Table info
  var table = document.getElementsByTagName( 'table' )[0];

  // Adding cells to the newly created row initialized to 0
  for( var i = 1; i <= trialNum; i++ ) {
    
    // Add a new empty row to the table
    newRow = table.insertRow( i );

    // Adding cells to the newly created row
    newRow.insertCell( TRIAL_NUM_CELL ).innerHTML = 0;
    newRow.insertCell( STARTING_ELAPSED_TIME_CELL ).innerHTML = 0;
    newRow.insertCell( TOTAL_ELAPSED_TIME_CELL ).innerHTML = 0; 
    newRow.insertCell( TRIAL_TIME_CELL ).innerHTML = 0;   
    newRow.insertCell( LATITUDE_CELL ).innerHTML = 0;
    newRow.insertCell( LONGITUDE_CELL ).innerHTML = 0;
    newRow.insertCell( STARTING_TIME_ZONE_CELL ).innerHTML = 0;
    newRow.insertCell( ENDING_TIME_ZONE_CELL ).innerHTML = 0;

  }

  // Repopulating each cell with data from localStorage
  for( var i = 1; i <= localStorage.getItem( 'trialNum' ); i++ ) {
    repopulateData( i );
  }

}

/**
 * Stores all information/data from session into localStorage, restored when 
 * user reopens stopwatch application
 *
 * @param trialNum represents previous number of trials and restores table with
 * correct number of trials
 */
function populateStorage( trialNum ) {

  /*
   * Variables in String format to create unique key variables to save in storage
   * This is to prevent localStorage API from overriding values of same key
   */
  var trialStr = 'trial'.concat( trialNum );
  var startingElapsedTimeStr = 'startingElapsedTime'.concat( trialNum );
  var totalElapsedTimeStr = 'totalElapsedTime'.concat( trialNum );
  var trialTimeStr = 'trialTime'.concat( trialNum );
  var latitudeStr = 'latitude'.concat( trialNum );
  var longitudeStr = 'longitude'.concat( trialNum );
  var startingTimeZoneStr = 'startingTimeZone'.concat( trialNum );
  var endingTimeZoneStr = 'endingTimeZone'.concat( trialNum );

  // Stores information from the table into localStorage
  var table = document.getElementsByTagName( 'table' )[0];
  localStorage.setItem( trialStr, table.rows[trialNum].cells[TRIAL_NUM_CELL].innerHTML );
  localStorage.setItem( startingElapsedTimeStr, 
    table.rows[trialNum].cells[STARTING_ELAPSED_TIME_CELL].innerHTML );
  localStorage.setItem( totalElapsedTimeStr, 
    table.rows[trialNum].cells[TOTAL_ELAPSED_TIME_CELL].innerHTML );
  localStorage.setItem( trialTimeStr, table.rows[trialNum].cells[TRIAL_TIME_CELL].innerHTML );
  localStorage.setItem( latitudeStr, table.rows[trialNum].cells[LATITUDE_CELL].innerHTML );
  localStorage.setItem( longitudeStr, table.rows[trialNum].cells[LONGITUDE_CELL].innerHTML );
  localStorage.setItem( startingTimeZoneStr, 
    table.rows[trialNum].cells[STARTING_TIME_ZONE_CELL].innerHTML );
  localStorage.setItem( endingTimeZoneStr, 
    table.rows[trialNum].cells[ENDING_TIME_ZONE_CELL].innerHTML );

  // Time values are stored into localStorage
  localStorage.setItem( 'elapsedSeconds', elapsedTime.seconds );
  localStorage.setItem( 'trialNum', trialNum );

}

/**
 * Restores all information from previous session into respective cells
 * 
 * @param trialNum represents previous number of trials and restores table with
 * correct number of trials
 */
function repopulateData( trialNum ) {

  /*
   * Variables in String format to create unique key variables to save in storage
   * This is to prevent localStorage API from overriding values of same key
   */
  var trialStr = 'trial'.concat( trialNum );
  var startingElapsedTimeStr = 'startingElapsedTime'.concat( trialNum );
  var totalElapsedTimeStr = 'totalElapsedTime'.concat( trialNum );
  var trialTimeStr = 'trialTime'.concat( trialNum );
  var latitudeStr = 'latitude'.concat( trialNum );
  var longitudeStr = 'longitude'.concat( trialNum );
  var startingTimeZoneStr = 'startingTimeZone'.concat( trialNum );
  var endingTimeZoneStr = 'endingTimeZone'.concat( trialNum );

  // Restores information from localStorage to each respective cell in the table
  var table = document.getElementsByTagName( 'table' )[0];
  table.rows[trialNum].cells[TRIAL_NUM_CELL].innerHTML = localStorage.getItem( trialStr );
  table.rows[trialNum].cells[STARTING_ELAPSED_TIME_CELL].innerHTML = 
    localStorage.getItem( startingElapsedTimeStr );
  table.rows[trialNum].cells[TOTAL_ELAPSED_TIME_CELL].innerHTML = 
    localStorage.getItem( totalElapsedTimeStr );
  table.rows[trialNum].cells[TRIAL_TIME_CELL].innerHTML = localStorage.getItem( trialTimeStr );
  table.rows[trialNum].cells[LATITUDE_CELL].innerHTML = localStorage.getItem( latitudeStr );
  table.rows[trialNum].cells[LONGITUDE_CELL].innerHTML = localStorage.getItem( longitudeStr );
  table.rows[trialNum].cells[STARTING_TIME_ZONE_CELL].innerHTML = 
    localStorage.getItem( startingTimeZoneStr );
  table.rows[trialNum].cells[ENDING_TIME_ZONE_CELL].innerHTML = 
    localStorage.getItem( endingTimeZoneStr );

}