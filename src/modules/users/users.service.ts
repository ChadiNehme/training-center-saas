import { pool } from "../../config/database.js";
import type { CreateUserInput } from "./users.types.js";
import bcrypt from "bcrypt";

export async function createUser(
    organizationId: string,
    input: CreateUserInput
) {
    const existingUser = await pool.query(
        "SELECT id FROM users WHERE email = $1",
        [input.email]
    );

    if (existingUser.rowCount && existingUser.rowCount > 0) {
        throw new Error("Email already registered");
    }
    const passwordHash = await bcrypt.hash(input.password, 12);
    const result = await pool.query(
        `
  INSERT INTO users (
    organization_id,
    name,
    email,
    password_hash,
    role
  )
  VALUES ($1, $2, $3, $4, $5)
  RETURNING id, organization_id, name, email, role, created_at
  `,
        [
            organizationId,
            input.name,
            input.email,
            passwordHash,
            input.role
        ]
    );

    return result.rows[0];
}

export async function getUsersByOrganization(organizationId: string) {
    const result = await pool.query(
        `
    SELECT
      id,
      name,
      email,
      role,
      created_at
    FROM users
    WHERE organization_id = $1
    ORDER BY created_at DESC
    `,
        [organizationId]
    );

    return result.rows;
}