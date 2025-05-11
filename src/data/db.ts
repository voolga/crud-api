import { IUsers } from "../types";
import fs from "fs";
import path from "path";
const filePath = path.join(__dirname, "users.json");

let users: IUsers = [];

try {
  const fileData = fs.readFileSync(filePath, "utf-8");
  users = JSON.parse(fileData);
} catch (err) {
  console.error("Failed to load initial users:", err);
  users = [];
}

export const saveUsers = () => {
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
};

export default users;
