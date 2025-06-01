// src/utils/googleCalendar.js

const CLIENT_ID =
  "328701998111-tmisd20ksfna4driqc6u2kj597j7cp0s.apps.googleusercontent.com";
const SCOPES = "https://www.googleapis.com/auth/calendar.events";

let accessToken = "";

export const initializeGapi = () => {
  // No need to load old gapi modules, just ensure script is present
  if (
    !window.google ||
    !window.google.accounts ||
    !window.google.accounts.oauth2
  ) {
    console.error("Google Identity Services not loaded");
  }
};

export const signInWithGoogle = () => {
  return new Promise((resolve, reject) => {
    const tokenClient = window.google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPES,
      callback: (tokenResponse) => {
        if (tokenResponse.access_token) {
          accessToken = tokenResponse.access_token;
          resolve();
        } else {
          reject("Token error");
        }
      },
    });

    tokenClient.requestAccessToken();
  });
};

export const createCalendarEvent = async (summary, description, start, end) => {
  const event = {
    summary,
    description,
    start: {
      dateTime: start,
      timeZone: "Asia/Dubai",
    },
    end: {
      dateTime: end,
      timeZone: "Asia/Dubai",
    },
  };

  const response = await fetch(
    "https://www.googleapis.com/calendar/v3/calendars/primary/events",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to create calendar event");
  }

  const result = await response.json();
  console.log("Calendar Event Created:", result);
  return result;
};
