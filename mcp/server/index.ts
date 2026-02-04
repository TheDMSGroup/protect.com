import express from "express";
import bodyParser from "body-parser";

import { previewPatch, applyPatch } from "./tools/patchTools";

const app = express();
app.use(bodyParser.json());

app.post("/preview-patch", async (req, res) => {
  const { diff } = req.body;
  try {
    const result = await previewPatch(diff);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post("/apply-patch", async (req, res) => {
  const { diff } = req.body;
  try {
    const result = await applyPatch(diff);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 1000;
app.listen(PORT, () => {
  console.log(`MCP Patch Tool Server is running on port ${PORT}`);
});
