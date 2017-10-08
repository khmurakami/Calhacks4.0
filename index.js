


exports.handler = function (event, context) {
    try {
        console.log("event.session.application.applicationId=" + event.session.application.applicationId);

        /**
         * Uncomment this if statement and populate with your skill's application ID to
         * prevent someone else from configuring a skill that sends requests to this function.
         */
        /*
        if (event.session.application.applicationId !== "amzn1.echo-sdk-ams.app.[unique-value-here]") {
             context.fail("Invalid Application ID");
        }
        */

        if (event.session.new) {
            onSessionStarted({requestId: event.request.requestId}, event.session);
        }

        if (event.request.type === "LaunchRequest") {
            onLaunch(event.request,
                event.session,
                function callback(sessionAttributes, speechletResponse) {
                    context.succeed(buildResponse(sessionAttributes, speechletResponse));
                });
        } else if (event.request.type === "IntentRequest") {
            onIntent(event.request,
                event.session,
                function callback(sessionAttributes, speechletResponse) {
                    context.succeed(buildResponse(sessionAttributes, speechletResponse));
                });
        } else if (event.request.type === "SessionEndedRequest") {
            onSessionEnded(event.request, event.session);
            context.succeed();
        }
    } catch (e) {
        context.fail("Exception: " + e);
    }
};

/**
 * Called when the session starts.
 */
function onSessionStarted(sessionStartedRequest, session) {
    console.log("onSessionStarted requestId=" + sessionStartedRequest.requestId +
        ", sessionId=" + session.sessionId);
}

/**
 * Called when the user launches the skill without specifying what they want.
 */
function onLaunch(launchRequest, session, callback) {
    console.log("onLaunch requestId=" + launchRequest.requestId +
        ", sessionId=" + session.sessionId);

    // Dispatch to your skill's launch.
    getWelcomeResponse(callback);
}

/**
 * Called when the user specifies an intent for this skill.
 */
function onIntent(intentRequest, session, callback) {
    console.log("onIntent requestId=" + intentRequest.requestId +
        ", sessionId=" + session.sessionId);

    var intent = intentRequest.intent,
        intentName = intentRequest.intent.name;

    // Dispatch to your skill's intent handlers
    if ("MyIssueIntent" === intentName) {
        setIssueInSession(intent, session, callback);
    } else if ("WhatsMyIssueIntent" === intentName) {
        getIssueFromSession(intent, session, callback);
    } else if ("AMAZON.HelpIntent" === intentName) {
        getWelcomeResponse(callback);
    } else if ("AMAZON.StopIntent" === intentName || "AMAZON.CancelIntent" === intentName) {
        handleSessionEndRequest(callback);
    } else {
        throw "Invalid intent";
    }
}

/**
 * Called when the user ends the session.
 * Is not called when the skill returns shouldEndSession=true.
 */
function onSessionEnded(sessionEndedRequest, session) {
    console.log("onSessionEnded requestId=" + sessionEndedRequest.requestId +
        ", sessionId=" + session.sessionId);
    // Add cleanup logic here
}

// --------------- Functions that control the skill's behavior -----------------------

function getWelcomeResponse(callback) {
    // If we wanted to initialize the session to have some attributes we could add those here.
/*    
console.log('Loading function');

var config = {
    "thingName": 'PiGroundStation01',
    "endpointAddress": "aifnfv70trnh7.iot.us-east-1.amazonaws.com"
}

var AWS = require('aws-sdk');
var iotdata = new AWS.IotData({endpoint: config.endpointAddress});


    console.log('Received event:', JSON.stringify(callback, null, 2));
    iotdata.getThingShadow({
        thingName: config.thingName
    }, function(err, data) {
        if (err) {
            context.fail(err);
        } else {
            console.log(data);
            var jsonPayload = JSON.parse(data.payload);
            var status = jsonPayload.state.reported.status;
            console.log('status: ' + status);
            var newStatus;
            if (status == 'forward') {
                newStatus = 'left';
            } else {
                newStatus = 'right';
            }
            var update = {
                   "desired" : {
                        "position" : newStatus
                    }
                
            };
            iotdata.updateThingShadow({
                payload: JSON.stringify(update),
                thingName: config.thingName
            }, function(err, data) {
                if (err) {
                    context.fail(err);
                } else {
                    console.log(data);
                    context.succeed('newStatus: ' + newStatus);
                }
            });
        }
    });

*/


////////////////////////////////////////////
    var request = require('request')
//    request.post(
//    'http://aabea750.ngrok.io',
//    { json: { key: 'forward' } },
//    function (error, response, body) {
//        if (!error && response.statusCode == 200) {
//            console.log(body)
//        }
//    }
//);

    // Set the headers
var headers = {
    'User-Agent':       'Super Agent/0.0.1',
    'Content-Type':     'application/x-www-form-urlencoded'
}

// Configure the request
var options = {
    url: 'http://44bf8cc5.ngrok.io/',
    method: 'POST',
    headers: headers,
    form: {'key1': 'forward', 'key2':2}
}

// Start the request
request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        // Print out the response body
        console.log(body)
    }
})

    var sessionAttributes = {};
    var cardTitle = "Diagnostic Test";
    var speechOutput = "Going Forward "    ;
    // If the user either does not reply to the welcome message or says something that is not
    // understood, they will be prompted again with this text.
    var repromptText = " Do something else";
    var shouldEndSession = true;
    request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        // Print out the response body
        console.log(body)
    }



// iot upload

//Environment Configuration
/*
console.log('Received event:', JSON.stringify(callback, null, 2));
    iotdata.getThingShadow({
        thingName: config.thingName
    }, function(err, data) {
        if (err) {
            context.fail(err);
        } else {
            console.log(data);
            var jsonPayload = JSON.parse(data.payload);
            var status = jsonPayload.state.reported.status;
            console.log('status: ' + status);
            var newStatus;
            if (status == 'forward') {
                newStatus = 'left';
            } else {
                newStatus = 'right';
            }
            var update = {
                   "desired" : {
                        "position" : newStatus
                    }
            };
            iotdata.updateThingShadow({
                payload: JSON.stringify(update),
                thingName: config.thingName
            }, function(err, data) {
                if (err) {
                    context.fail(err);
                } else {
                    console.log(data);
                    context.succeed('newStatus: ' + newStatus);
                }
            });
        }
    });


*/

/////////////////////////////////////////////////

})



    callback(sessionAttributes,
        buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
}

function handleSessionEndRequest(callback) {
    var cardTitle = "Session Ended";
    var speechOutput = "I hope I helped you with your problem.     Have a nice day!";
    // Setting this to true ends the session and exits the skill.
    var shouldEndSession = true;

    callback({}, buildSpeechletResponse(cardTitle, speechOutput, null, shouldEndSession));
}

/**
 * Sets the color in the session and prepares the speech to reply to the user.
 */
function setIssueInSession(intent, session, callback) {
    var cardTitle = intent.name;
    var favoriteIssueSlot = intent.slots.Issue;
    var repromptText = "";
    var sessionAttributes = {};
    var shouldEndSession = false;
    var speechOutput = " ";
    var Problem;

    if(favoriteIssueSlot.value == 'counselor'){
        var hand = favoriteIssueSlot.value;
        sessionAttributes = createFavoriteIssueAttributes(hand);
        speechOutput = "Welcome to your digital life counselor. You can ask a question like, how can I improve my life? ... Now, what can I help you with.";
        repromptText = "Now how can I help you? ";
        shouldEndSession = false;
    }

    if(favoriteIssueSlot.value == 'diagnostic test'){
        var test = favoriteIssueSlot.value;
        sessionAttributes = createFavoriteIssueAttributes(test);
        speechOutput = "Give a general location of the problem. You can say, My hand hurts or something like that   ";
        repromptText = "You can ask me where it hurts by saying and example, My hands are broken  ";
        shouldEndSession = false;
    }

    if(favoriteIssueSlot.value == 'bad day at school'){
        var atschool = favoriteIssueSlot.value;
        sessionAttributes = createFavoriteIssueAttributes(atschool);
        speechOutput = "Oh, what happened?   ";
        repromptText = "Tell me more";
        shouldEndSession = false;
    }

    if(favoriteIssueSlot.value == 'bullied'){
        var bullied = favoriteIssueSlot.value;
        sessionAttributes = createFavoriteIssueAttributes(bullied);
        speechOutput = "I am sorry to hear that. I think you should go talk to a trusted friend or adult to help with the problem. Never try to tackle this problem by yourself. You can go to sites for more information on stopbullying.gov and hackharrassment.com  ";
        repromptText = "Tell me more";
        shouldEndSession = false;
    }

     if(favoriteIssueSlot.value == 'grades'){
        var grades = favoriteIssueSlot.value;
        sessionAttributes = createFavoriteIssueAttributes(grades);
        speechOutput = "Don’t panic. Everyone gets a bad grade at some point in their life. It can feel like the end of the world, but don't worry.    Establish how you got that grade.     Did you not understand the material? Did you not study enough? Did you not follow the directions?       ";
        repromptText = "Ask for more life advice ";
        shouldEndSession = false;
    }

    if(favoriteIssueSlot.value == 'life'){
        var life = favoriteIssueSlot.value;
        sessionAttributes = createFavoriteIssueAttributes(life);
        speechOutput = "There are several things you can do. Exercise, meet new people, go out doors, and try something new with your life! More importantly, make sure to smile! You never know who is watching!  ";
        repromptText = "Ask for more life advice ";
        shouldEndSession = false;
    }

    if(favoriteIssueSlot.value == 'bullies'){
        var bullies = favoriteIssueSlot.value;
        sessionAttributes = createFavoriteIssueAttributes(bullies);
        speechOutput = "Go talk to a trusted friend or adult to help with the problem. Never try to tackle this problem by yourself. You can go to sites for more information on stopbullying.gov and hackharassment.com";
        repromptText = "Ask for more life advice ";
        shouldEndSession = false;
    }

    if(favoriteIssueSlot.value == 'online harassment' || 'online harassed' || 'online harrasing' || 'flamed' || 'uninstall'){
        var harassment = favoriteIssueSlot.value;
        sessionAttributes = createFavoriteIssueAttributes(bullies);
        speechOutput = "Go talk to the system administrators if there are any. If not, try not to go along in his or her pace...You might also have to stand up to him or her...";
        repromptText = "Ask for more life advice ";
        shouldEndSession = false;
    }


     if(favoriteIssueSlot.value == 'fingers are broken'){
        var fingerbroken = favoriteIssueSlot.value;
        sessionAttributes = createFavortieIssueAttributes(fingerbroken);
        speechOutput = "See immediate care for your finger";
        shoudldEndSession = true;
    }
    if(favoriteIssueSlot.value == 'hand'){
        var hand = favoriteIssueSlot.value;
        sessionAttributes = createFavoriteIssueAttributes(hand);
        speechOutput = "It seems your hand is hurt. Where does it hurt on your hand?";
        repromptText = "You can ask me where it hurts by saying and example, My fingers are broken  ";
        shouldEndSession = false;
    }

 /*   if(favoriteColorSlot.value == 'fingers are broken'){
        var fingerbroken = favoriteColorSlot.value;
        sessionAttributes = createFavortieColorAttributes(fingerbroken);
        speechOutput = "See immediate care for your finger";
        shoudldEndSession = true;
    }
    */

    /* if(favoriteColorSlot.value == 'nine one one'){
        var emergency = favoriteColorSlot.value;
        sessionAttributes = createFavortieColorAttributes(emergency);
        speechOutput = "Calling 911";
        shoudldEndSession = true;
    }

    if(favoriteColorSlot.value == 'lower back pain'){
        var LowBackPain = favoriteColorSlot.value;
        sessionAttributes = createFavortieColorAttributes(LowBackPain);
        speechOutput = "You might have these following problems if your lower back hurts.   ";
        shoudldEndSession = false;
    }

    if(favoriteColorSlot.value == 'upper back pain'){
        var UpperBackPain = favoriteColorSlot.value;
          sessionAttributes = createFavortieColorAttributes(UpperBackPain);
        speechOutput = "You might have these following problems if your upper back hurts.   ";
        shoudldEndSession = false;
    }

    */

    if(favoriteIssueSlot.value == 'hand is gone'){
        var gone = favoriteIssueSlot.value;
        sessionAttributes = createFavoriteIssueAttributes(gone);
        speechOutput = "You should ask your doctor for a hand ";
    }
    if (favoriteIssueSlot.value == 'head') {
        var head = favoriteIssueSlot.value;
        sessionAttributes = createFavoriteIssueAttributes(head);
        speechOutput = "Where does it hurt on your" + head;
        repromptText = "You can ask me where it hurts by saying, it hurts by my head ";
    }
    if(favoriteIssueSlot.value == 'leg') {
        var leg = favoriteIssueSlot.value;
        sessionAttributes = createFavoriteIssueAttributes(leg);
        speechOutput = "I see your legs hurt.  Where does it hurt on your legs";
        repromptText = "You can ask me which side it hurts on, It hurts on my left side";
        Problem = 1;
        shouldEndSession = false;
        //repromptText = "I'm not sure where it hurts. You can where it hurts by saying, It hurts by my head";
    }
    if(favoriteIssueSlot.value =='left side'){
        var leftside = favoriteIssueSlot.value;
        sessionAttributes = createFavoriteIssueAttributes(leftside);
        speechOutput = "I see your left side of your leg hurts.";
        shouldEndSession = false;
    }
    if(favoriteIssueSlot.value == 'right side'){
        var rightside = favoriteIssueSlot.value
        sessionAttributes = createFavoriteIssueAttributes(rightside);
        speechOutput = "I see your right side of your leg hurts."
    }

    if(favoriteIssueSlot.value =='I am dying'){
        var dieing = favoriteIssueSlot.value;
        sessionAttributes = createFavoriteIssueAttributes(dieing);
        speechOutput = "Someone call 911";
        shouldEndSession = false;
    }



   // else {
    //    speechOutput = "I can't solve you"
    //    shouldEndSession = false;
  //  }


    callback(sessionAttributes,
         buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
}

function createFavoriteIssueAttributes(favoriteIssue) {
    return {
        favoriteIssue: favoriteIssue
    };
}


function getIssueFromSession(intent, session, callback) {
    var favoriteIssue;
    var repromptText = null;
    var sessionAttributes = {};
    var shouldEndSession = false;
    var speechOutput = "";
    var problem;

        if (session.attributes) {
        favoriteIssue = session.attributes.favoriteIssue;
    }

    if (favoriteIssue) {
        speechOutput = "What is your problem" + favoriteIssue;
        shouldEndSession = false;

    } else {
        speechOutput = "I'm not sure what the problem is.  Please try again....   ";
    }






    // Setting repromptText to null signifies that we do not want to reprompt the user.
    // If the user does not respond or says something that is not understood, the session
    // will end.
    callback(sessionAttributes,
         buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));
}

// --------------- Helpers that build all of the responses -----------------------

function buildSpeechletResponse(title, output, repromptText, shouldEndSession) {
    return {
        outputSpeech: {
            type: "PlainText",
            text: output
        },
        card: {
            type: "Simple",
            title: "SessionSpeechlet - " + title,
            content: "SessionSpeechlet - " + output
        },
        reprompt: {
            outputSpeech: {
                type: "PlainText",
                text: repromptText
            }
        },
        shouldEndSession: shouldEndSession
    };
}

function buildResponse(sessionAttributes, speechletResponse) {
    return {
        version: "1.0",
        sessionAttributes: sessionAttributes,
        response: speechletResponse
    };
}

