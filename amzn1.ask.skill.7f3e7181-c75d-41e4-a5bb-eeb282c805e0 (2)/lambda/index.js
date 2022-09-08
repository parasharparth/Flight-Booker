/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = 'Welcome, you can say Hello or Help. Would you like to book a flight?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const HelloWorldIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'HelloWorldIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Hello World!';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

const bookAFlightIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'bookAFlightIntent';
    },
    handle(handlerInput) {
        const slots = handlerInput.requestEnvelope.request.intent.slots;
        
       
         let inputclass = slots.Class.value;
         let departureCity = slots.departurecity.value;
         let arrivalCity = slots.arrivalcity.value;
         
         const eco = 'economy';
         const bus = 'business';
         const fir = 'first';
        let econumberOfPassengers = 0;
        let businessnumberofpassengers = 0;
        let firstnumberofpassengers = 0;
        
        let speakOutput = 'This is the Book A Flight intent!. Congratulations, your flight is booked successfully';
        
        if(inputclass === eco)
        {
            econumberOfPassengers = econumberOfPassengers + 1;
            speakOutput += "  Details of booked flight:-  "+ departureCity +" to "+ arrivalCity+ " for " + econumberOfPassengers+ " person in economy class ";
        }
        if(inputclass === bus)
        {
            businessnumberofpassengers = businessnumberofpassengers + 1;
            speakOutput += "Details of booked flight:-  "+ departureCity +" to "+ arrivalCity+ " for " + businessnumberofpassengers+ " person in business class is booked successfully";
        }
        if(inputclass === fir)
        {
            firstnumberofpassengers = firstnumberofpassengers + 1;
            speakOutput += "Details of booked flight:-  "+ departureCity +" to "+ arrivalCity+ " for " + firstnumberofpassengers+ " person in first class is booked successfully";
        }
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

const findNearestAirportIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'findNearestAirportIntent';
    },
    handle(handlerInput) {
        const slots = handlerInput.requestEnvelope.request.intent.slots;
        let speakOutput = 'This is the find Nearest Airport intent! ';
        let inputCity = slots.city.value;
        
        if(inputCity ==="Portland")
        {
            speakOutput += " There is 1 airport in " + inputCity +" which is 12 miles from city center";
        }
        else if(inputCity === "Seattle")
        {
            speakOutput += " There is 1 airport in " + inputCity +" which is 8 miles from city center";
        }
        else if(inputCity === "Sacramento")
        {
            speakOutput += "There are 2 airports in " + inputCity +" which are 12 and 22 miles away from city center respectively";
            speakOutput += "And The nearest airport to you is 12 miles away";
        }
         else if(inputCity === "Austin")
        {
            speakOutput += " There is 1 airport in " + inputCity +" which is 5 miles from city center";
        }
         else if(inputCity === "Buffalo")
        {
            speakOutput += " There is 1 airport in " + inputCity +" which is 1 miles from city center";
        }
         else if(inputCity === "Carolina")
        {
            speakOutput += " There is 1 airport in " + inputCity +" which is 21 miles from city center";
        }
        else
        {
            speakOutput += "Unable to find nearest airport due to database restrictions for "+inputCity;
        }
        
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

const searchFlightScheduleIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'searchFlightScheduleIntent';
    },
    handle(handlerInput) {
        const slots = handlerInput.requestEnvelope.request.intent.slots;
        let speakOutput = 'This is the search Flight Schedule intent! The optimal flight is: ';
        let departureCity = slots.departurecity.value;
        
        if(departureCity === "Portland")
        {
            speakOutput += " There is 1 optimal flight which departs at 23:00 hours from "+departureCity;
        }
        else if(departureCity === "Seattle")
        {
            speakOutput += " There is 1 optimal flight which departs at 01:00 hours" +departureCity;
        }
        else if(departureCity === "Sacramento")
        {
            speakOutput += " There is 1 optimal flight which departs at 09:00 hours" +departureCity;
        }
         else if(departureCity === "Austin")
        {
            speakOutput += " There is 1 optimal flight which departs at 10:00 hours" +departureCity;
        }
         else if(departureCity === "Buffalo")
        {
            speakOutput += " There is 1 optimal flight which departs at 18:00 hours" +departureCity;
        }
         else if(departureCity === "Carolina")
        {
            speakOutput += " There is 1 optimal flight which departs at 24:00 hours" +departureCity;
        }
        else
        {
            speakOutput += "Unable to find optimal flight due to database restrictions for "+departureCity;
        }
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

const liveFlightTrackerIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'liveFlightTrackerIntent';
    },
    handle(handlerInput) {
        let speakOutput = "Welcome to the live flight tracker intent. ";
        const slots = handlerInput.requestEnvelope.request.intent.slots;
        let flight = slots.flightNumber.value;
        
        if(flight === "united 211")
        {
            speakOutput += flight + " status :- The flight is currently over Atlanta and is running on time";
        }
        else if(flight === "united 987")
        {
            speakOutput += flight +" status:- The flight is currently over atlantic ocean and is running on time " ;
        }
        else if(flight === "united 999")
        {
            speakOutput += flight +" status:- The flight is currently over Pacific ocean and is running 15 minutes late " ;
        }
        else if(flight === "united 126")
        {
            speakOutput += flight +" status:- The flight is currently running late and hasn't departed from its departure city. The delay is of 5 hours " ;
        }
        else if(flight === "united 125")
        {
            speakOutput += flight +" status:- The flight has arrived on its destination on time " ;
        }
        else if(flight === "united 124")
        {
            speakOutput += flight +" status:- The flight has arrived on its destination 15 minutes late " ;
        }
        else if(flight === "united 123")
        {
            speakOutput += flight +" status:- The flight is currently over New york and is expected to arrive about 10 minutes early on its destination" ;
        }
        else if(flight === "united 111")
        {
            speakOutput += flight +" status:- The flight has arrived on its destination on time " ;
        }
        else{
            speakOutput += flight +" status:- Could not locate the flight due to data restrictions. Might be due to unavailability of ailrine with out service " ;
        }
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

const seatPlanIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'seatPlanIntent';
    },
    handle(handlerInput) {
        let speakOutput = 'wekcome to the seat plan intent handler ';
        const slots = handlerInput.requestEnvelope.request.intent.slots;
        let flight = slots.flightNumber.value;
        let date = slots.scheduledDate.value;
        
        if(flight === "united 211")
        {
            speakOutput += flight + "  for date " +date + " has the following number of seats available :- economy  100, Business 44 and first  10";
        }
        else if(flight === "united 987")
        {
            speakOutput += flight + " for date " +date + " has the following number of seats available :- economy  10, Business 0 and first  0";
        }
        else if(flight === "united 999")
        {
            speakOutput += flight + " for date " +date + " has the following number of seats available :- economy  200, Business 12 and first  0";
        }
        else if(flight === "united 126")
        {
            speakOutput += flight + " for date " +date + " has the following number of seats available :- economy  30, Business 1 and first  1";
        }
        else if(flight === "united 125")
        {
            speakOutput += flight + " for date " +date + " has the following number of seats available :- economy  330, Business 55 and first  0";
        }
        else if(flight === "united 124")
        {
            speakOutput += flight + " for date " +date + " has the following number of seats available :- economy  66 , Business 1 and first  10";
        }
        else if(flight === "united 123")
        {
            speakOutput += flight + " for date " +date + " has the following number of seats available :- economy  300, Business 22 and first  30";
        }
        else if(flight === "united 111")
        {
            speakOutput += flight + " for date " +date + " has the following number of seats available :- economy  99, Business 4 and first  50";
        }
        else{
            speakOutput += flight + " has the following number of seats available :- Not available because of data restrictions";
        }
        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};



const airlineInformationIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'airlineInformationIntent';
    },
    handle(handlerInput) {
        let speakOutput = 'welcome to the airline Information Intent Handler ';
        const slots = handlerInput.requestEnvelope.request.intent.slots;
        let name = slots.airlineName.value;
        
        if(name === "Ryan air")
        {
            speakOutput += name + " Ryanair is an Irish ultra low-cost carrier founded in 1984. It is headquartered in Swords, Dublin, Ireland and has its primary operational bases at Dublin and London Stansted airports";
            speakOutput += "It forms the largest part of the Ryanair Holdings family of airlines and has Ryanair UK, Buzz, Lauda Europe, and Malta Air as sister airlines.";
            speakOutput += "It is Ireland's biggest airline and became in 2016, Europe's largest budget airline by scheduled passengers flown, carrying more international passengers than any other airline";
            speakOutput += "Ryanair Group operates more than 400 Boeing 737-800 aircraft, with a single 737-700 used as a charter aircraft, as a backup, and for pilot training.";
            speakOutput += "The airline has been characterized by its rapid expansion, a result of the deregulation of the aviation industry in Europe in 1997 and the success of its low-cost business model.";
            speakOutput += "Ryanair's route network serves 40 countries in Europe, North Africa (Morocco), and the Middle East (Israel, Jordan and Turkey)";
        }
        else if(name === "Swiss air")
        {
             speakOutput += name + " Swiss International Air Lines AG (short for Aktiengesellschaft), colloquially known as SWISS, is the flag carrier of Switzerland, operating scheduled services in Europe and to North America, South America, Africa and Asia. Zurich Airport serves as its sole hub and Geneva Airport as a focus city. ";
            speakOutput += "The airline was formed following the bankruptcy in 2002 of Swissair, Switzerland's then flag carrier. ";
            speakOutput += "The new airline was built around what had been Swissair's regional subsidiary, Crossair. Swiss retains Crossair's IATA code LX (Swissair's code was SR).";
            speakOutput += "It assumed Swissair's old ICAO code of SWR (Crossair's was CRX), to maintain international traffic rights. It is a member of Star Alliance and a subsidiary of the Lufthansa Group. ";
            speakOutput += " Its headquarters are at EuroAirport Basel Mulhouse Freiburg near Basel, Switzerland, and an office at Zurich Airport in Kloten, Switzerland.[7] .";
            speakOutput += "The company's registered office is in Basel.[8]";
        }
        else if(name === "Iceland air")
        {
             speakOutput += name + " Icelandair is the flag carrier airline of Iceland, headquartered at Keflavík International Airport near the capital city Reykjavik";
            speakOutput += "It is part of the Icelandair Group and operates to destinations on both sides of the Atlantic Ocean from its main hub at Keflavík International Airport.";
            speakOutput += " The geographical position of Iceland is convenient for one-stop transatlantic flights, which is one pillar of the airline's business strategy, along with traffic to, from, and within the country.[5]";
            speakOutput += "Icelandair traces its roots back to 1937, when Flugfélag Akureyrar was founded in Akureyri on the north coast of Iceland.";
            speakOutput += "Flight operations started in 1938 with a single Waco YKS-7 configured as a floatplane.";
            speakOutput += " In 1939 the airline was grounded when this aircraft was destroyed in a capsizing accident.";
        }
        else if(name === "air India")
        {
             speakOutput += name + " Air India is the flag carrier airline of India, headquartered at New Delhi.";
            speakOutput += "It is owned by Talace Private Limited, a Special-Purpose Vehicle (SPV) of Tata Sons, after Air India Limited's former owner, the Government of India, completed the sale..";
            speakOutput += "Air India operates a fleet of Airbus and Boeing aircraft serving 102 domestic and international destinations.";
            speakOutput += "The airline has its hub at Indira Gandhi International Airport, New Delhi, alongside several focus cities across India.";
            speakOutput += "Air India is the largest international carrier out of India with an 18.6% market share.";
            speakOutput += "Over 60 international destinations are served by Air India across four continents. The airline became the 27th member of Star Alliance on 11 July 2014.";
        }
        else if(name === "air Canada")
        {
             speakOutput += name + " Air Canada is the flag carrier and the largest airline of Canada by fleet size and passengers carried";
            speakOutput += "Air Canada maintains its headquarters in the borough of Saint-Laurent, Montreal, Quebec. .";
            speakOutput += "The airline, founded in 1937, provides scheduled and charter air transport for passengers and cargo to 222 destinations worldwide.";
        }
        else if(name === "eithad")
        {
             speakOutput += name + " Etihad Airways is the second flag carrier airline of the United Arab Emirates.";
            speakOutput += " Its head office is in Khalifa City, Abu Dhabi, near Abu Dhabi International Airport. Etihad commenced operations in November 2003.";
           
        }
        else if(name === "emirates")
        {
             speakOutput += name + " Emirates  is one of two flag carriers of the United Arab Emirates (the other being nearby Etihad)";
            speakOutput += "Based in Garhoud, Dubai, the airline is a subsidiary of The Emirates Group, which is owned by the government of Dubai's Investment Corporation of Dubai.";
            
        }
        else if(name === "delta airlines")
        {
             speakOutput += name + " Delta Air Lines, Inc., typically referred to as Delta, is one of the major airlines of the United States and a legacy carrier.";
            speakOutput += "One of the world's oldest airlines in operation, Delta is headquartered in Atlanta, Georgia";
            
        }
        else if(name === "spirit airlines")
        {
             speakOutput += name + " Spirit Airlines Inc. is a major American ultra-low-cost carrier headquartered in Miramar, Florida, in the Miami metropolitan area.";
            speakOutput += "Spirit operates scheduled flights throughout the United States and in the Caribbean and Latin America.";
            
        }
        else if(name === "united airlines")
        {
             speakOutput += name + " United Airlines, Inc. is a major American airline headquartered at Willis Tower in Chicago, Illinois.";
            speakOutput += "United operates a large domestic and international route network spanning cities large and small across the United States and all six inhabited continents.";
            
        }
        else if(name === "American airlines")
        {
             speakOutput += name + " American Airlines, Inc., is a major US-based airline headquartered in Fort Worth, Texas, within the Dallas–Fort Worth metroplex.";
            speakOutput += " It is the world's largest airline when measured by fleet size, scheduled passengers carried, and revenue passenger mile.";
            
        }
        else{
            speakOutput += name+ " Information for this airline is not available due to database restrictions";
        }
        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

const documentsRequiredIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'documentsRequiredIntent';
    },
    handle(handlerInput) {
        let speakOutput = 'welcome to the documents required intent handler. Documents required are: - Passport and Supporting documents like visa and travel reason statement. ';
        const slots = handlerInput.requestEnvelope.request.intent.slots;
        let country = slots.countryName.value;
        
        if(country === "India")
        {
            speakOutput += "One pro tip while travelling to "+country +" is to always exchange currency at airport as it is illegal to carry Indian currency out of the country";
        }
        else if(country === "United States")
        {
            speakOutput += "One pro tip while travelling to "+country +" is to always keep all documents ready as it gets really busy at immigration checkpoints";
        }
        else if(country === "Australia")
        {
            speakOutput += "One pro tip while travelling to "+country +" is to always have two sim cards as one sim is never going to work country wide";
        }
        else if(country === "England")
        {
            speakOutput += "One pro tip while travelling to "+country +" is to always expect rain and carry an umbrella";
        }
        else if(country === "Canada")
        {
            speakOutput += "One pro tip while travelling to "+country +" is to always be prepared for a natural dose of ice";
        }
        else if(country === "Singapore")
        {
            speakOutput += "One pro tip while travelling to "+country +" is to not carry any sharp objects (even nail cutters) as it is considered illegal to possess any object that can harm anyone ";
        }
        else{
            speakOutput += "One pro tip while travelling to "+country +" is to always look out for delicious local cuisines";
        }
        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'You can say hello to me! How can I help?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Goodbye!';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet 
 * */
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Sorry, I don\'t know about that. Please try again.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};
/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const speakOutput = 'Sorry, I had trouble doing what you asked. Please try again.';
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        HelloWorldIntentHandler,
        liveFlightTrackerIntentHandler,
        seatPlanIntentHandler,
        airlineInformationIntentHandler,
        documentsRequiredIntentHandler,
        bookAFlightIntentHandler,
        findNearestAirportIntentHandler,
        searchFlightScheduleIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();