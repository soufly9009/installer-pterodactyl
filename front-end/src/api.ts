export async function installPanel(body: {
  domain: string;
  ssl: string;
  cloudflareToken: string;
}) {
  await fetch("http://localhost:4000/api/install/panel", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}
export async function installNode(body: {
  nodeName: string;
  cloudflareToken: string;
}) {
  await fetch("http://localhost:4000/api/install/node", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}
