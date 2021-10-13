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

export interface CompositeProps {
  token: string;
  userId: string;
  displayName: string;
  threadId: string;
  endpointURL: string;
}

function Composite(props: CompositeProps): JSX.Element {
  
  //Chat Variables
  const [chatAdapter, setChatAdapter] = useState<ChatAdapter>();

  // We can't even initialize the Chat and Call adapters without a well-formed token.
  const credential = useMemo(() => {
    try {
      return new AzureCommunicationTokenCredential(props.token);
    } catch {
      console.error('Failed to construct token credential');
      return undefined;
    }
  }, [props.token]);

  useEffect(() => {
    const createAdapter = async (): Promise<void> => {
      setChatAdapter(
        await createAzureCommunicationChatAdapter({
          endpointUrl: props.endpointURL,
          userId: { kind: 'communicationUser', communicationUserId: props.userId },
          displayName: props.displayName,
          credential: new AzureCommunicationTokenCredential(props.token),
          threadId: props.threadId
        })
      );
    };
    if( credential != undefined) createAdapter();
  }, [credential]);

  if (!!chatAdapter) {
    return (
      <>
      <div style={{height: '100%'}}>
        <ChatComposite adapter={chatAdapter} options={{
          participantPane: false,
          topic: false
        }} />
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