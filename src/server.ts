import { app } from "./shared/app";

app.listen(process.env.APP_PORT, () => {
  console.log("📡 http server is running");
});
