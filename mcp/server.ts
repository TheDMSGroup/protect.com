//mcp server

import { Server } from "@modelcontextprotocol/sdk/server";
import { StdioTransport } from "@modelcontextprotocol/sdk/transports/stdio-transport";

import express from "express";
import bodyParser from "body-parser";

import { previewPatch, applyPatch } from "./tools/patchTools";

const server = new Server({
  name: "Protect.com MCP Server",
  version: "0.1.0",
  capabilities: {
    tools: {},
  },
});

//read eslint configs

server.tool(
  "read_eslint_configs",
  "Read ESLint configuration files from repo to ensure code suggestions conform to rules.",
  async () => {
    const response = await fetch("http://localhost:1000/preview-patch", {
      method: "POST",
      body: JSON.stringify({ diff }),
    });
    return {
      content: [
        {
          type: "text",
          text: await response.text(),
        },
      ],
    };
  }
);

server.tool(
  "apply_patch",
  "Apply a code patch to the codebase.",
  async ({ diff }) => {
    const response = await fetch("http://localhost:1000/apply-patch", {
      method: "POST",
      body: JSON.stringify({ diff }),
    });
    return {
      content: [
        {
          type: "text",
          text: await response.text(),
        },
      ],
    };
  },
  { requiresApproval: true }
);

server.connect(new StdioTransport());

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
