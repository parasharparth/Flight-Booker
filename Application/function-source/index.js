// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues
'use strict';
 
const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');
 
process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements
 
exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));
 
  function welcome(agent) {
    agent.add(`Welcome to my agent!`);
  }
 
  function fallback(agent) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
  }
  
  const getRandom = (len) => {
    const random = Math.floor(Math.random() * len);
    return random; 
  };
  
  function bookAFlight(agent)
  {
    let departureCity = agent.parameters.DepartureCity;
    let arrivalCity = agent.parameters.ArrivalCity;
    let inputclass = agent.parameters.Class;
    const eco = 'economy';
    const bus = 'business';
    const fir = 'first';
    let econumberOfPassengers = 0;
    let businessnumberofpassengers = 0;
    let firstnumberofpassengers = 0;
        
    let speakOutput = 'This is the Book A Flight intent!. Congratulations, your flight is booked successfully ';
        
    if(inputclass === eco)
    {
            econumberOfPassengers = econumberOfPassengers + 1;
            speakOutput += "  Details of booked flight:-  "+ departureCity +" to "+ arrivalCity+ " for " + econumberOfPassengers+ " person in economy class ";
    }
    if(inputclass === bus)
    {
            businessnumberofpassengers = businessnumberofpassengers + 1;
            speakOutput += " Details of booked flight:-  "+ departureCity +" to "+ arrivalCity+ " for " + businessnumberofpassengers+ " person in business class is booked successfully";
    }
    if(inputclass === fir)
    {
            firstnumberofpassengers = firstnumberofpassengers + 1;
            speakOutput += " Details of booked flight:-  "+ departureCity +" to "+ arrivalCity+ " for " + firstnumberofpassengers+ " person in first class is booked successfully";
    }
    agent.add(speakOutput);
  }
  
  const nearestAirport = [
  '20',
  '30',
  '40',
  '50',
  ];
  
  function findNearestAirport(agent)
  {
    let inputCity = agent.parameters.city;
    const random = getRandom(nearestAirport.length);
    let speakOutput = 'This is the find Nearest Airport intent! ';
    if(inputCity === 'Portland')
        {
            speakOutput += " There is 1 airport in " + inputCity +" which is 12 miles from city center";
        }
        else if(inputCity === 'Seattle')
        {
            speakOutput += " There is 1 airport in " + inputCity +" which is 8 miles from city center";
        }
        else if(inputCity === 'Sacramento')
        {
            speakOutput += "There are 2 airports in " + inputCity +" which are 12 and 22 miles away from city center respectively";
            speakOutput += " And The nearest airport to you is 12 miles away";
        }
         else if(inputCity === 'Austin')
        {
            speakOutput += " There is 1 airport in " + inputCity +" which is 5 miles from city center";
        }
         else if(inputCity === 'Buffalo')
        {
            speakOutput += " There is 1 airport in " + inputCity +" which is 1 miles from city center";
        }
         else if(inputCity === 'Carolina')
        {
            speakOutput += " There is 1 airport in " + inputCity +" which is 21 miles from city center";
        }
        else
        {
            speakOutput += "The nearest airport is "+ nearestAirport[random]+ " miles away from the city center";
        }
    agent.add(speakOutput);
  }

  const airlineNames = [
  '03:00 - American Airlines',
  '04:00 - United Airlines',
  '05:00 - Delta Airlines',
  '06:00 - Spirit Airlines',
  ];
  
  function searchFlightSchedule(agent)
  {
    const random = getRandom(airlineNames.length);
    let departureCity = agent.parameters.DepartureCity;
    let arrivalCity = agent.parameters.ArrivalCity;
    let date = agent.parameters.date;
    
    let speakOutput = 'This is the search Flight Schedule intent! ';
    
    if(arrivalCity === 'Seattle')
    {
      speakOutput += ' The optimal flight departing from '+ departureCity + ' and arriving in Seattle International Airport in: '+ arrivalCity;
      speakOutput += '  '+ airlineNames[random];
    }
    else if(arrivalCity === 'Portland')
    {
      speakOutput += ' The optimal flight departing from '+ departureCity + ' and arriving in Portland International Airport is: '+ arrivalCity;
      speakOutput += '  '+ airlineNames[random];
    }
    else 
    {
       speakOutput += ' The optimal flight departing from '+ departureCity + ' and arriving in is: '+ arrivalCity;
      speakOutput += '  '+ airlineNames[random];
    }
  	  
    agent.add(speakOutput);
  }
  
  // // Uncomment and edit to make your own intent handler
  // // uncomment `intentMap.set('your intent name here', yourFunctionHandler);`
  // // below to get this function to be run when a Dialogflow intent is matched
  // function yourFunctionHandler(agent) {
  //   agent.add(`This message is from Dialogflow's Cloud Functions for Firebase editor!`);
  //   agent.add(new Card({
  //       title: `Title: this is a card title`,
  //       imageUrl: 'https://developers.google.com/actions/images/badges/XPM_BADGING_GoogleAssistant_VER.png',
  //       text: `This is the body text of a card.  You can even use line\n  breaks and emoji! 💁`,
  //       buttonText: 'This is a button',
  //       buttonUrl: 'https://assistant.google.com/'
  //     })
  //   );
  //   agent.add(new Suggestion(`Quick Reply`));
  //   agent.add(new Suggestion(`Suggestion`));
  //   agent.setContext({ name: 'weather', lifespan: 2, parameters: { city: 'Rome' }});
  // }

  // // Uncomment and edit to make your own Google Assistant intent handler
  // // uncomment `intentMap.set('your intent name here', googleAssistantHandler);`
  // // below to get this function to be run when a Dialogflow intent is matched
  // function googleAssistantHandler(agent) {
  //   let conv = agent.conv(); // Get Actions on Google library conv instance
  //   conv.ask('Hello from the Actions on Google client library!') // Use Actions on Google library
  //   agent.add(conv); // Add Actions on Google library responses to your agent's response
  // }
  // // See https://github.com/dialogflow/fulfillment-actions-library-nodejs
  // // for a complete Dialogflow fulfillment library Actions on Google client library v2 integration sample

  // Run the proper function handler based on the matched Dialogflow intent name
  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', welcome);
  intentMap.set('Default Fallback Intent', fallback);
  intentMap.set('bookAFlight Intent', bookAFlight);
  intentMap.set('findNearestAirport Intent', findNearestAirport);
  intentMap.set('searchFlightSchedule Intent', searchFlightSchedule);
  // intentMap.set('your intent name here', yourFunctionHandler);
  // intentMap.set('your intent name here', googleAssistantHandler);
  agent.handleRequest(intentMap);
});
