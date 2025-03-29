import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { fetchCatImage } from "./fetchCatImage.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

// Create server instance
const server = new McpServer({
  name: "cat-image",
  version: "1.0.0",
});

server.tool("get-cat-image", "Get a random cat image",
  async () => {
    const data = await fetchCatImage();
    return {
      content: [
        {
          type: "image",
          data,
          mimeType: "image/jpeg",
        },
      ],
    };
  });

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Cat Image MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});