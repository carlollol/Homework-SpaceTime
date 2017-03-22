 // Initialize Firebase
    var config = {
      apiKey: "AIzaSyAt0Lt0V8t_sZXE-v96v3QpfG2YZ1Pczc4",
      authDomain: "planet-express-scheduler.firebaseapp.com",
      databaseURL: "https://planet-express-scheduler.firebaseio.com",
      storageBucket: "planet-express-scheduler.appspot.com",
      messagingSenderId: "492148863317"
    };
    firebase.initializeApp(config);


	var database = firebase.database();

	$("#finalize-pod-info").on("click", function(event){
		event.preventDefault();

		var podID = $("#planetExpress-unit-id").val().trim();
		var podDestination = $("#destination").val().trim();
		var podStart = $("#start-time").val().trim();
		var podFrequency = $("#frequency").val().trim();

		var tempPod = {
			id: podID,
			destination: podDestination,
			start: podStart,
			frequency: podFrequency
		}

		database.ref().push(tempPod);

		$("#planetExpress-unit-id").val("");
		$("#destination").val("");
		$("#start-time").val("");
		$("#frequency").val("");

	return false;
	});

	database.ref().on("child_added", function(childSnapshot, prevChildKey) {

		var podID = childSnapshot.val().id;
		var podDestination = childSnapshot.val().destination;
		var podStart = childSnapshot.val().start;
		var podFrequency = childSnapshot.val().frequency;

		var currentTimeB = moment();
		var currentTime = moment().format("HH:mm");

		var diffTime = moment().diff(moment(currentTimeB));

		var timeBefore = diffTime % podFrequency;
		var nextETA = podFrequency - timeBefore;

		var nextPod = moment().add(nextETA, "minutes").format("hh:mm a");

		
		$("#ep-table > tbody").append("<tr><td>" + podID + "</td><td>" + podDestination + "</td><td>" + podFrequency + "</td><td>" + nextPod + "</td><td>" + nextETA + "</td></tr>");

	});