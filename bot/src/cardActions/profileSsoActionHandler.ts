import { AdaptiveCards } from "@microsoft/adaptivecards-tools";
import { TurnContext, InvokeResponse } from "botbuilder";
import { TeamsFxAdaptiveCardActionHandler, InvokeResponseFactory } from "../sdk"
import responseCard from "../adaptiveCards/doStuffActionResponse.json";
import { CardData } from "../cardModels";
import { TeamsFxAdaptiveCardSsoActionHandler } from "../sdk/conversation/interface";

/**
 * The `HelloWorldCardActionHandler` registers an action with the `TeamsFxBotActionHandler` and responds
 * with an Adaptive Card if the user clicks the Adaptive Card action with `triggerVerb`.
 */
export class ProfileSsoActionHandler implements TeamsFxAdaptiveCardSsoActionHandler {
  triggerVerb = "doProfile";

  async handleActionInvoked(context: TurnContext, actionData: any, ssoToken: string): Promise<InvokeResponse> {
    /**
     * You can send an adaptive card to respond to the card action invoke.
     */
    const cardData: CardData = {
      title: "Hello World Bot",
      body: "Congratulations! Your task is processed successfully. Click the button below to learn more about Bots and the Teams Toolkit." + ssoToken,
    };

    const cardJson = AdaptiveCards.declare(responseCard).render(cardData);
    return InvokeResponseFactory.adaptiveCard(cardJson);

    /**
     * If you want to send invoke response with text message, you can:
     * 
     return InvokeResponseFactory.textMessage("[ACK] Successfully!");
    */

    /**
     * If you want to send invoke response with error message, you can:
     *
     * return InvokeResponseFactory.errorResponse(InvokeResponseErrorCode.BadRequest, "The incoming request is invalid.");
     */
  }
}
