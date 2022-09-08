import { AdaptiveCards } from "@microsoft/adaptivecards-tools";
import { TurnContext, InvokeResponse } from "botbuilder";
import { createMicrosoftGraphClient, InvokeResponseFactory, TeamsBotSsoPromptTokenResponse, TeamsFx } from "../sdk"
import responseCard from "../adaptiveCards/doStuffActionResponse.json";
import { CardData } from "../cardModels";
import { TeamsFxSsoAdaptiveCardActionHandler } from "../sdk/conversation/interface";

/**
 * The `HelloWorldCardActionHandler` registers an action with the `TeamsFxBotActionHandler` and responds
 * with an Adaptive Card if the user clicks the Adaptive Card action with `triggerVerb`.
 */
export class ProfileSsoActionHandler implements TeamsFxSsoAdaptiveCardActionHandler {
  triggerVerb = "doProfile";

  async handleActionInvoked(context: TurnContext, actionData: any, tokenResponse: TeamsBotSsoPromptTokenResponse): Promise<InvokeResponse> {
    // Init TeamsFx instance with SSO token
    const teamsfx = new TeamsFx().setSsoToken(tokenResponse.ssoToken);

    // Add scope for your Azure AD app. For example: Mail.Read, etc.
    const graphClient = createMicrosoftGraphClient(teamsfx, ["User.Read"]);
  
    // Call graph api use `graph` instance to get user profile information
    const me = await graphClient.api("/me").get();

    if (me) {
      const cardData: CardData = {
        title: "Profile information",
        body: `You're logged in as ${me.displayName} (${me.userPrincipalName})`,
      };
      const cardJson = AdaptiveCards.declare(responseCard).render(cardData);
      return InvokeResponseFactory.adaptiveCard(cardJson);
    } else {
      return InvokeResponseFactory.textMessage("Could not retrieve profile information from Microsoft Graph.");
    }

    /**
     * If you want to send invoke response with error message, you can:
     *
     * return InvokeResponseFactory.errorResponse(InvokeResponseErrorCode.BadRequest, "The incoming request is invalid.");
     */
  }
}
