Stopwatch Web Application
===============

TODO list: 
 - Insert pictures step by step of the process
 - Describe each functional buttons
 - Describe all of the column items
 - other shit
 - APIs used
 - Organize this readme for a good documentation 

 <img src="images/start_page.jpg" />
 ![alt text](images/start_page.jpg)

This is a stopwatch web application that records information - multiple trials, coordinate positon, and time zones - within a data table that can be accessed offline. 

The stopwatch performs like an ordinary stopwatch application, consisting of a clock that counts up, a stop button, and reset button. 


Getting started
---------------
You can run this stopwatch application locally. Simply download the code and open the index.html file on your favorite web browser. 


How it works
------------
Here is some information about each information that is logged into the browser.
	- Trial: The amount of entries/trials that are logged into the timer. In other words, clicking the start button will begin a trial. Clicking the stop button will end the trial
	- Starting Elapsed Time: This is the time that will be recorded when the next trial begins. 
	- Total Elapsed Time: This cell in the table shows the current time displayed on the stopwatch. It updates as the stopwatch continues to run. The time will stop when the stopwatch is stopped.
	- Trial time: This records the duration of an individual trial. It begins when you click the start button and stops when you click the stop button. 
	- Latitude: This records the current latitude using the Geolocation API
	- Longitude: This records the current longitude using the Geolocation API.
	- Starting Time Zone: Beginning a trial will record the information about the current date, time, and time zone.
	- Ending Time Zone: Ending a trial will the record information about the current date, time, and time zone.

There is also a Web Storage API utilized within this application. This allows data entered in the table to be remembered even after refreshing or reopening the browswer.

Steps
----- 
The following are steps to how to use the stopwatch.
1. Click the start button to begin the stopwatch. When you do, you will notice that a new row has been added to the table. This will start recording the times with each respective trial, along with information regarding your current time zone. 
2. The application will also ask you for your location using Geolocation API, in which you are free to accept or decline this request. If you accept, the application will display your coordinates below the buttons. If you choose to decline, or if the API could not find your location, the longitude and latitude will be represented by the value -1. 
3. When you click the stop button, the longitude and latitude coordinates will be updated into the table. In addition, the current time zone will be updated in a new cell. 
4. You can repeat this process of adding new information in separate trials by starting and stopping the stopwatch. 
5. The reset button resets all information in the table and time, in addition to the information stored in the localStorage (more information regarding the use of Web Storage API above)
6. The user may reopen the browser and maintain all of his or her data in the table. 


## Goals 
I would ike to improve my stopwatch application in the following aspects
 - [ ] Redesign the website to make it more appealing with colors
 - [ ] Implement a method that acquires the coordinates offline while still using the API
 - [ ] Have the Geolocation API and the time zone capabilities work together
 - [ ] Condense code so that algorithms and variables are used efficently and effectively rather than simply incorporated.