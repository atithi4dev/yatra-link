import fs from "fs";

const FILE_PATH = "./driverPayloads.json";

// --- Save driver payload to JSON ---
export function handleDriverPayload(payload) {
  // You can do any processing here: throttling, filtering, etc.
  const processed = {
    ...payload,
    processedAt: new Date().toISOString(),
  };

  saveToJson(processed);
}

// --- Save to local file ---
function saveToJson(data) {
  let existing = [];
  if (fs.existsSync(FILE_PATH)) {
    const fileData = fs.readFileSync(FILE_PATH);
    existing = JSON.parse(fileData.toString() || "[]");
  }

  existing.push(data);
  fs.writeFileSync(FILE_PATH, JSON.stringify(existing, null, 2));
  console.log(`Saved payload for bus ${data.busId}`);
}
