import { AzureCommunicationTokenCredential } from '@azure/communication-common';
import {
  CallComposite,
  CallAdapter,
  createAzureCommunicationCallAdapter,
  ChatComposite,
  ChatAdapter,
  createAzureCommunicationChatAdapter
} from '@azure/communication-react';
import { useEffect, useMemo, useState } from 'react';
import React = require('react');

function Composite(): JSX.Element {
  const token = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjEwMyIsIng1dCI6Ikc5WVVVTFMwdlpLQTJUNjFGM1dzYWdCdmFMbyIsInR5cCI6IkpXVCJ9.eyJza3lwZWlkIjoiYWNzOjU3ZjAxZTQzLTMxOGUtNDY2MS1hZTBlLWI2NzY1ZDY1ODAxYV8wMDAwMDAwZC0xNjc0LTk1MWItNjJmZi0yMzQ4MjIwMDExNjgiLCJzY3AiOjE3OTIsImNzaSI6IjE2MzQwNzY5MTQiLCJleHAiOjE2MzQxNjMzMTQsImFjc1Njb3BlIjoidm9pcCxjaGF0IiwicmVzb3VyY2VJZCI6IjU3ZjAxZTQzLTMxOGUtNDY2MS1hZTBlLWI2NzY1ZDY1ODAxYSIsImlhdCI6MTYzNDA3NjkxNH0.D-THuHQ_A7eFzlyoOw7p7worlrr2i_zbKkTWA6tPPXVnkVqDsWQFYfTMDI68GqpeaKMdac3h2XtokuhOj9S-uJuGFn5Hw8BOcNif6wk6QE8uBs_bSD97qGWFWU-k6bREXAO4U5R8HxWujzTds85NCA02WPuqaqagHqZcYCZRIZGvunnXpEMgdWt5c7pNoH10wTtgLMUEZYMRmpcBnacELWYuXDJBFCITmAFGjGTdchfH-3SVkKcQem4jvyszzGUw7gMOGz-MN9R24ea76jC4cyElUpaxTTOOIUHjo39ZcfPLwiBEN7uzepjpHgT1LIN12QXnc_PLDmEn4IY_LCjLGg";
  const userId = "8:acs:57f01e43-318e-4661-ae0e-b6765d65801a_0000000d-1674-951b-62ff-234822001168";
  const displayName = "David";
  //private GUID = "'edba7d6f-5f37-4fba-89d2-ae18720a1ae9'";
  const threadId = "19:wwSg2V4JsD1MNn4U6jt6Tc2jPTvpuiWb0gjilcwmk481@thread.v2";
  const endpointUrl = "https://acs-test-resource.communication.azure.com/";

  //Calling Variables
  //For Group Id, developers can pass any GUID they can generate
  //const groupId = '<Developer generated GUID>';
  //const [callAdapter, setCallAdapter] = useState<CallAdapter>();

  //Chat Variables
  const [chatAdapter, setChatAdapter] = useState<ChatAdapter>();

  // We can't even initialize the Chat and Call adapters without a well-formed token.
  const credential = useMemo(() => {
    try {
      return new AzureCommunicationTokenCredential(token);
    } catch {
      console.error('Failed to construct token credential');
      return undefined;
    }
  }, [token]);

  useEffect(() => {
    const createAdapter = async (): Promise<void> => {
      setChatAdapter(
        await createAzureCommunicationChatAdapter({
          endpointUrl,
          userId: { kind: 'communicationUser', communicationUserId: userId },
          displayName,
          credential: new AzureCommunicationTokenCredential(token),
          threadId
        })
      );
    };
    createAdapter();
  }, []);

  if (!!chatAdapter) {
    return (
      <>
      <div style={{height: '75vh'}}>
        <ChatComposite adapter={chatAdapter} />
      </div>
      </>
    );
  }
  if (credential === undefined) {
    return <h3>Failed to construct credential. Provided token is malformed.</h3>;
  }
  return <h3>Initializing...</h3>;
}

export default Composite;