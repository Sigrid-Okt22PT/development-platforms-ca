import express from "express";
import cors from "cors";
import "dotenv/config";

import authRoutes from "./routes/auth";
import articleRoutes from "./routes/articles";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "News API",
  });
});

app.use("/auth", authRoutes);
app.use("/articles", articleRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});