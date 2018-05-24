$( document ).ready(function() {
$("#btnCalculate").click(function(){
	//get values of time pickers
	var startTime = $("#formatTime1").val();
	var endTime = $("#formatTime2").val();
	// parse time using 24-hour clock and use UTC to prevent DST issues
	var start = moment.utc(startTime, "hh:mm");
	var end = moment.utc(endTime, "hh:mm");
	// account for crossing over to midnight the next day
	if (end.isBefore(start)) end.add(1, 'day');
	// calculate the duration
	var d = moment.duration(end.diff(start));
	var s = moment.utc(+d).format('h:mm');
	var splitHours = s.split(':');
	//spit out hours
	var hours = splitHours[0];
	var minutesTest = splitHours[1];
	//split times into array
	var splitTime1 = startTime.split(':');
	var splitTime2 = endTime.split(':');
	//cut off the minutes
	var minutes1 = splitTime1[1];
	var minutes2 = splitTime2[1];
	//cut off hours
	var hour1 = splitTime1[0];
	var hour2 = splitTime2[0];
	var newMinutes = getMinutes(minutesTest);
	var roundedTime = parseFloat(hours) + parseFloat(newMinutes);
	//if hour1 and hour2 are the same, subtract 12
	if(hour1 == hour2){
		var conflict = roundedTime - 12;
		$("#resultCard1 span").text(conflict);
	} else {
		$("#resultCard1 span").text(roundedTime);
	}
	}); 
});

$("#btnCalRound").click(function(){
	//initial values
	var units = $("#freeTextUnits").val();
	var splitUnits = units.split(".");
	var firstHalfofUnits = splitUnits[0];
	var lastHalfofUnits = splitUnits[1];
	var dt = new Date();
	var time = dt.getHours() + ":" + dt.getMinutes();
	
	var splitTime = time.split(":");
	var hour = splitTime[0];
	
	var calcTime = hour - firstHalfofUnits;
	var cleanString = "."+lastHalfofUnits;
	
	var tester = minutize(cleanString);
	
	var fullStartTime = calcTime +":"+ tester;
	
	console.log("Start Time: "+fullStartTime);
	
	console.log("End Time: "+time)
})

function minutize(floatingNumber) {
	if (floatingNumber == ".00") {
		return randomNumberFromRange(0,7);
	} else if (floatingNumber == ".25") {
		return randomNumberFromRange(8,22);
	} else if (floatingNumber == ".50") {
		return randomNumberFromRange(23,37);
	} else if (floatingNumber == ".75") {
		return randomNumberFromRange(38,52);
	}
}

function randomNumberFromRange(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

function getMinutes(minutes){
	if (minutes >= "00" && minutes <= "07") {
		return ".00";
	} else if (minutes >= "08" &&  minutes <= "22") {
		return ".25";
	} else if (minutes >= "23" && minutes <= "37") {
		return ".50";
	} else if (minutes >= "38" && minutes <= "52") {
		return ".75";
	} else if (minutes >= "53" && minutes <= "60") {
		return "1.00";
	}
}
