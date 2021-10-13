import {IInputs, IOutputs} from "./generated/ManifestTypes";

export class ACSHack implements ComponentFramework.StandardControl<IInputs, IOutputs> {

	private label: HTMLInputElement;
	private src: HTMLScriptElement;
	private composite: HTMLScriptElement;
	private callContainer: HTMLDivElement;

	private token = "'eyJhbGciOiJSUzI1NiIsImtpZCI6IjEwMyIsIng1dCI6Ikc5WVVVTFMwdlpLQTJUNjFGM1dzYWdCdmFMbyIsInR5cCI6IkpXVCJ9.eyJza3lwZWlkIjoiYWNzOjU3ZjAxZTQzLTMxOGUtNDY2MS1hZTBlLWI2NzY1ZDY1ODAxYV8wMDAwMDAwZC0xNjc0LTk1MWItNjJmZi0yMzQ4MjIwMDExNjgiLCJzY3AiOjE3OTIsImNzaSI6IjE2MzQwNzY5MTQiLCJleHAiOjE2MzQxNjMzMTQsImFjc1Njb3BlIjoidm9pcCxjaGF0IiwicmVzb3VyY2VJZCI6IjU3ZjAxZTQzLTMxOGUtNDY2MS1hZTBlLWI2NzY1ZDY1ODAxYSIsImlhdCI6MTYzNDA3NjkxNH0.D-THuHQ_A7eFzlyoOw7p7worlrr2i_zbKkTWA6tPPXVnkVqDsWQFYfTMDI68GqpeaKMdac3h2XtokuhOj9S-uJuGFn5Hw8BOcNif6wk6QE8uBs_bSD97qGWFWU-k6bREXAO4U5R8HxWujzTds85NCA02WPuqaqagHqZcYCZRIZGvunnXpEMgdWt5c7pNoH10wTtgLMUEZYMRmpcBnacELWYuXDJBFCITmAFGjGTdchfH-3SVkKcQem4jvyszzGUw7gMOGz-MN9R24ea76jC4cyElUpaxTTOOIUHjo39ZcfPLwiBEN7uzepjpHgT1LIN12QXnc_PLDmEn4IY_LCjLGg'";
	private userId = "'8:acs:57f01e43-318e-4661-ae0e-b6765d65801a_0000000d-1674-951b-62ff-234822001168'";
	private displayName = "'David'";
	private GUID = "'edba7d6f-5f37-4fba-89d2-ae18720a1ae9'";
	private threadId = "'19:wwSg2V4JsD1MNn4U6jt6Tc2jPTvpuiWb0gjilcwmk481@thread.v2'";
	private endpointUrl = "'https://acs-test-resource.communication.azure.com/'";
	private code = "const callAdapter = await callComposite.loadCallComposite({groupId: " + this.GUID + ", displayName:" + this.displayName + ", userId:" + this.userId + ", token: " + this.token + "}, document.getElementById('call-container'));";
	private chatCode = " const chatAdapter = await chatComposite.loadChatComposite({ displayName: " + this.displayName + ", threadId: " + this.threadId + ", endpointUrl: " + this.endpointUrl + ", userId: " + this.userId + ", token: " + this.token + "}, document.getElementById('chat-container'));"

	/**
	 * Empty constructor.
	 */
	constructor()
	{

	}

	/**
	 * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
	 * Data-set values are not initialized here, use updateView.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
	 * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
	 * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
	 * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
	 */
	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement): void
	{
		// Add control initialization code
		this.src = document.createElement("script");
		this.src.async = false;
		//this.src.setAttribute("src", "https://github.com/Azure/communication-ui-library/releases/latest/download/callComposite.js");
		this.src.setAttribute("src", "https://github.com/Azure/communication-ui-library/releases/latest/download/chatComposite.js");
		this.callContainer = document.createElement("div");
		//this.callContainer.setAttribute("id", "call-container");
		this.callContainer.setAttribute("id", "chat-container");
		this.callContainer.setAttribute("style", "height: 50vh");
		this.composite = document.createElement("script");
		this.src.addEventListener('load', () => {
			this.composite.type = "module";
			this.composite.defer = true;
			this.composite.text = this.chatCode;	
			container.appendChild(this.composite);		
		})
		container.appendChild(this.src);
		container.appendChild(this.callContainer);
	}


	/**
	 * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
	 */
	public updateView(context: ComponentFramework.Context<IInputs>): void
	{
		// Add code to update control view
		console.log(context)
	}

	/**
	 * It is called by the framework prior to a control receiving new data.
	 * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
	 */
	public getOutputs(): IOutputs
	{
		return {};
	}

	/**
	 * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
	 * i.e. cancelling any pending remote calls, removing listeners, etc.
	 */
	public destroy(): void
	{
		// Add code to cleanup control if necessary
	}
}
