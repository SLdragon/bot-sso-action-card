import { ApproveIncidentSubmitAction } from "../actions/approveIncidentSubmit";
import { CreateIncidentSubmitAction } from "../actions/createIncidentSubmit";
import { InitialCreateRefreshAction } from "../actions/initialCreateRefresh";
import { RejectIncidentSubmitAction } from "../actions/rejectIncidentSubmit";
import { ReviewIncidentRefreshAction } from "../actions/reviewIncidentRefresh";
import { CreateIncidentCommandHandler } from "../commands/createIncidentCommandHandler";
import { ConversationBot } from "../sdk/conversation";

// Create the command bot and register the command handlers for your app.
// You can also use the commandBot.command.registerCommands to register other commands
// if you don't want to register all of them in the constructor
export const commandBot = new ConversationBot({
  // The bot id and password to create BotFrameworkAdapter.
  // See https://aka.ms/about-bot-adapter to learn more about adapters.
  adapterConfig: {
    appId: process.env.BOT_ID,
    appPassword: process.env.BOT_PASSWORD,
  },
  command: {
    enabled: true,
    commands: [new CreateIncidentCommandHandler()],
  },
  action: {
    enabled: true,
    actions: [
      new InitialCreateRefreshAction(),
      new CreateIncidentSubmitAction(),
      new ReviewIncidentRefreshAction(),
      new ApproveIncidentSubmitAction(),
      new RejectIncidentSubmitAction()
    ],
  }
});
