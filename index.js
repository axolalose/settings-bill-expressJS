let express = require("express");
let app = express();
const exphbs = require("express-handlebars");
const body = require("body-parser");
const SettingsBill = require("./settings-bill");

const bill = SettingsBill();

const handlebarSetup = exphbs({
  partialsDir: "./views/partials",
  viewPath: "./views",
  layoutsDir: "./views/layouts"
});

app.engine("handlebars", handlebarSetup);
app.set("view engine", "handlebars");

app.use(express.static("public"));
app.use(body.urlencoded({ extended: false }));

app.get("/", function(req, res) {
  res.render("index", {
    settings: bill.getSettings(),
    totals: bill.totals(),
    level: bill.getColor()
  });
});

app.post("/settings", function(req, res) {
  bill.setSettings({
    smsCost: req.body.smsCost,
    callCost: req.body.callCost,
    warningLevel: req.body.warningLevel,
    criticalLevel: req.body.criticalLevel
  });

  res.redirect("/");
  console.log(bill.getSettings());
});

app.use(body.json());

app.post("/action", function(req, res) {
  bill.recordAction(req.body.actionType);

  res.redirect("/");
});

app.get("/actions", function(req, res) {
  res.render("action", { action: bill.actions() });
});

app.get("/actions/:actionPlan", function(req, res) {
  const actionPlan = req.params.actionPlan;
  res.render("action", { action: bill.actionsFor(actionPlan) });
});

let PORT = process.env.PORT || 3007;

app.listen(PORT, function() {
  console.log("App starting on port", PORT);
});

// app.get('/', function (req, res) {
//   res.render('home');
// });
