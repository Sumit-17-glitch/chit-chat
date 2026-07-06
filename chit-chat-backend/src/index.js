import { app } from "./app.js";

const port = 3000;

app.get("/", (req, res) => {
    res.send("<h1>hello world</h1>");
})

app.listen(port, () => {
    console.log(`app is listening on; http://localhost:${port}`);
    
});