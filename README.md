# Azure Communication Services Composites for Power Apps

Created PCF Components using Azure Communication Services to add calling and chat capabilities to Power Apps.
This project use the Azure Communication Services [UI Library](aka.ms/acsstorybook)

## Components
This repository includes three PCF components divided into three separate branches:

- Chat Component (master): Chat composite embeded into a PCF component. Exposes parameters to configure access token, user id, endpoint and thread id.
- Auth Component: Takes an Azure Function to get Azure Communication Services access token and user id which are exposed as outputs that other components can use.
- Calling Component: Calling composite embeded into a PCF component. Exposes parameters to configure access token, user id, group id.

## How to run

### Locally

1. Clone GitHub repository onto your local machine

```bash

git clone https://github.com/ddematheu2/ACS-PCF-Components.git

```

2. Navigate to the project folder and install npm dependencies

```bash

npm i

```

3. Run the project locally

```bash

npm start watch

```

Navigate on your browser to `http://127.0.0.1:8181/`

4. There you can test the component locally. If you makes changes to the composite code, it will be reflected here. More information on debugging components available on [Learn](https://learn.microsoft.com/power-apps/developer/component-framework/debugging-custom-controls).
