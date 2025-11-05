"use server";
import fs from "fs";
import path from "path";

import { writeFile } from "fs/promises";

const dataDir = path.join(process.cwd(), "data");
const dataFile = path.join(dataDir, "settings.json");
const uploadDir = path.join(process.cwd(), "public/uploads");
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


// 🧩 Ensure environment setup
function ensureEnvironment() {
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  if (!fs.existsSync(dataFile)) {
    const defaultSettings = {
      siteName: "My Website",
      panelName: "Admin Panel",
      maintenanceMode: false,
      servicesEnabled: true,
      logo: "/uploads/default-logo.png",
      favicon: "/uploads/default-favicon.png",
      bronzeMember: "Bronze",
      silverMember: "Silver",
      goldMember: "Gold",
      reseller: "Reseller",
    };
    fs.writeFileSync(dataFile, JSON.stringify(defaultSettings, null, 2));
  }
}

// 🟢 Get settings
export async function getWebsiteSettings() {
  try {
    ensureEnvironment();
    const data = fs.readFileSync(dataFile, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error("❌ getWebsiteSettings error:", err);
    return { error: "Failed to load settings" };
  }
}

// 🟢 Update settings
export async function updateWebsiteSettings(formData) {
  try {
    ensureEnvironment();

    const siteName = formData.get("siteName");
    const panelName = formData.get("panelName");
    const maintenanceMode = formData.get("maintenanceMode") === "true";
    const servicesEnabled = formData.get("servicesEnabled") === "true";

    const bronzeMember = formData.get("bronzeMember");
    const silverMember = formData.get("silverMember");
    const goldMember = formData.get("goldMember");
    const reseller = formData.get("reseller");

    let existing = JSON.parse(fs.readFileSync(dataFile, "utf-8"));

    // 🟡 Handle logo upload
    const logo = formData.get("logo");
    if (logo && typeof logo !== "string") {
      const bytes = await logo.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const fileName = `logo_${Date.now()}.png`;
      const filePath = path.join(uploadDir, fileName);
      await writeFile(filePath, buffer);
      existing.logo = `/uploads/${fileName}`;
    }

    // 🟠 Handle favicon upload
    const favicon = formData.get("favicon");
    if (favicon && typeof favicon !== "string") {
      const bytes = await favicon.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const fileName = `favicon_${Date.now()}.png`;
      const filePath = path.join(uploadDir, fileName);
      await writeFile(filePath, buffer);
      existing.favicon = `/uploads/${fileName}`;
    }

    // 🧩 Update other fields
    existing = {
      ...existing,
      siteName,
      panelName,
      maintenanceMode,
      servicesEnabled,
      bronzeMember,
      silverMember,
      goldMember,
      reseller,
    };

    fs.writeFileSync(dataFile, JSON.stringify(existing, null, 2));

    return { success: true, settings: existing };
  } catch (err) {
    console.error("❌ updateWebsiteSettings error:", err);
    return { success: false, error: "Failed to update settings" };
  }
}
