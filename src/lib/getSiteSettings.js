import fs from "fs";
import path from "path";

export async function getSiteSettings() {
  try {
    const dataPath = path.join(process.cwd(), "data/settings.json");

    // Ensure file exists
    if (!fs.existsSync(dataPath)) {
      return {
        siteName: "My Website",
        panelName: "Admin Panel",
        maintenanceMode: false,
        logo: "/uploads/default-logo.png",
        favicon: "/uploads/default-favicon.png",
        bronzeMember: "Bronze",
        silverMember: "Silver",
        goldMember: "Gold",
        reseller: "Reseller",
      };
    }

    const data = fs.readFileSync(dataPath, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading site settings:", err);
    return {
      siteName: "My Website",
      panelName: "Admin Panel",
      maintenanceMode: false,
      logo: "/uploads/default-logo.png",
      favicon: "/uploads/default-favicon.png",
      bronzeMember: "Bronze",
      silverMember: "Silver",
      goldMember: "Gold",
      reseller: "Reseller",
    };
  }
}
