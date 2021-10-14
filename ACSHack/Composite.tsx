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
  groupId: string;
  height: string;
}

function Composite(props: CompositeProps): JSX.Element {
  
  //Calling Variables
  //For Group Id, developers can pass any GUID they can generate
  const [callAdapter, setCallAdapter] = useState<CallAdapter>();

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
      setCallAdapter(
        await createAzureCommunicationCallAdapter({
          userId: { kind: 'communicationUser', communicationUserId: props.userId },
          displayName: props.displayName,
          credential: new AzureCommunicationTokenCredential(props.token),
          locator: { groupId: props.groupId }
        })
      );
    };
    if( credential != undefined && props.groupId != "") createAdapter();
  }, [credential]);

  
  if (credential === undefined) {
    return <h3>Failed to construct credential. Provided token is malformed.</h3>;
  }
  if (props.groupId === "") {
    return <h3>Provide a valid group id</h3>;
  }
  if (!!callAdapter) {
    return (
      <>
      <div style={{height: props.height + 'px'}}>
        <CallComposite 
        adapter={callAdapter} 
        options={{
          mobileView: true
        }} />
      </div>
      </>
    );
  }
  return <h3>Initializing...</h3>;
}

export default Composite;