import {uuid} from 'uuidv4';

import {google} from 'googleapis';


import token from './token';


namespace ryoujisan{
  // If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly']; // todo: スコープを書き換える



const requestId = uuid();

const event = {
  'summary': 'sample meets',
  'start': {
    'dateTime': '2015-05-28T09:00:00-07:00',
    'timeZone': 'America/Los_Angeles',
  },
  'end': {
    'dateTime': '2015-05-28T17:00:00-07:00',
    'timeZone': 'America/Los_Angeles',
  },
}

const conferenceData = {
  createRequest: {
    conferenceSolutionKey: {
      type: 'hangoutsMeet',
    },
    requestId,
  },
}

async function insertEvent(auth) {
  const calendar = google.calendar({version: 'v3', auth});
  const insertedEvent = await calendar.events.insert({
    auth: auth,
    calendarId: 'primary',
    requestBody: {
      conferenceData: conferenceData
    }
  });

  return {googleMeetUrl: insertedEvent.data.conferenceData.entryPoints[0].uri}
  
}
}
