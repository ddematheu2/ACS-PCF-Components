# Azure Communication Services Composites for Power Apps

Created PCF Components using Azure Communication Services to add calling and chat capabilities to Power Apps.
This project use the Azure Communication Services [UI Library](aka.ms/acsstorybook)

## Components
This repository includes three PCF components divided into three separate branches:

- Chat Component (master): Chat composite embeded into a PCF component. Exposes parameters to configure access token, user id, endpoint and thread id.
- Auth Component: Takes an Azure Function to get Azure Communication Services access token and user id which are exposed as outputs that other components can use.
- Calling Component: Calling composite embeded into a PCF component. Exposes parameters to configure access token, user id, group id.

## How to run
TBD
