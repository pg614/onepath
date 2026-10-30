// Build One Thing: emails each results signup their one business.
// Paste into script.google.com, then Deploy > New deployment > Web app
// (Execute as: Me, Who has access: Anyone). Copy the Web app URL.
const NAMES = {
  dir:"A helpful guide website", dig:"A shop for helpful downloads",
  news:"A weekly email people look forward to", face:"A how-to video channel (you never appear)",
  tool:"A simple online tool", lead:"A local services website",
  prod:"A done-for-you helping service", crea:"Short videos where you share what you know",
  comm:"A members' club for people like you"
};
function doPost(e) {
  const d = JSON.parse(e.postData.contents || "{}");
  const email = String(d.email || "").trim().toLowerCase();
  const name = NAMES[d.verdict];
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || !name) return out("bad");
  const props = PropertiesService.getScriptProperties();
  if (props.getProperty(email)) return out("already");          // one email per address
  if (MailApp.getRemainingDailyQuota() < 5) return out("quota");
  const body =
`Hi there,

Thanks for taking the quiz. Here's your one business:

  ${name}

You're on the launch list. We'll email you when your AI CEO is ready to start building it with you. There's nothing you need to do right now.

Want to look at your full plan again? It's saved here:
https://buildonething.com/#quiz

One business. A little progress every day.

Warmly,
Build One Thing
https://buildonething.com

A quick, honest note: we can't promise any income or results. What we promise is a clear plan and steady progress, one step at a time.
You got this email because you asked for your result at buildonething.com. Not you, or want off the list? Just reply and say so.`;
  MailApp.sendEmail({to: email, subject: "Your one business: " + name, body: body, name: "Build One Thing"});
  props.setProperty(email, new Date().toISOString());
  return out("sent");
}
function out(s){return ContentService.createTextOutput(s)}
