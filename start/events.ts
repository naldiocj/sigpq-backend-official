/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
| sigpq-events.ts
*/
const filePath = '../addons/modulo-sigpq/@core/events/sigpq-eventos.ts'; // Importamos os eventos do SIGPQ

async function importarEventosDoSigpq(filePath:string) {
  try {
    await import(filePath);
  } catch (error) {}
}importarEventosDoSigpq(filePath);

// Event.on('new:user', (user) => {
//     console.log(user)
// })

// Event.on('novo:utilizador', (user) => {
//     console.log(user)
// })


// Event.on('utilizador:registar', 'AgenteEvento.registar')
// Event.on('agente:registar', 'AgenteEvento.registar')
// Event.on('agente:listar', 'AgenteEvento.listar')

// Event.on("log:registo", "LogEvent.registo");



// Event.on("reset:sendEmail", "ResetPassword.sendEmail");
// Event.on("cache:clear", "Cache.clear");
// Event.on("email:sendCredentials", "EmailCredentials.sendCredentials");
// Event.on("schedule:register", "Schedule.create");
// Event.on("schedule:update", "Schedule.update");

// Event.on('database:set-field-to-nullable', 'SetFieldToNullableOnDatabase.handle')

// Event.on("notification:new-submission", "Notification.newSubmission");
// Event.on("notification:new-unlock-request", "Notification.newUnlockRequestOrNewRessubmissionRequest");
// Event.on("notification:new-ressubmission-request", "Notification.newUnlockRequestOrNewRessubmissionRequest");

// Event.on("notification-po:publish-template", "Notification.publishTemplate");
// Event.on(
//   "notification-po:validate-submission",
//   "Notification.updateStatusOfSubmittedTemplate"
// );

// Event.on(
//   "notification-po:validate-submission-by-validator",
//   "Notification.updateStatusOfSubmittedTemplateByValidator"
// );

// Event.on("notification-po:validate-matrix", "Notification.validateMatrix")

// Event.on("notification-po:typing-indicator", "Notification.typingIndicator");

// Event.on(
//   "notification-po:validate-unlock-request",
//   "Notification.validateUnlockRequest"
// );
// Event.on(
//   "notification-po:validate-resubmission-request",
//   "Notification.validateResubmissionRequest"
// );
// Event.on("notification-po:run-job-schedle", "Notification.schedule");
// Event.on(
//   "notification-po:run-job-schedule-for-unlock-request",
//   "Notification.unlockRequestTask"
// );
// Event.on(
//   "notification-po:cancel-unlock-request",
//   "Notification.validateResubmissionRequest"
// );
// Event.on(
//   "socketnotification:sendNotification",
//   "SocketNotification.sendNotification"
// );
// Event.on("forceResetPassword:notify", "ForceResetPassword.notify");
