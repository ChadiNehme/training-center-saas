import bcrypt from "bcrypt";
import { pool } from "../../config/database.js";
import type { RegisterInput, LoginInput } from "./auth.types.js";
import jwt from "jsonwebtoken";

export async function register(input: RegisterInput) {
    const client = await pool.connect();

    try {
        await client.query("BEGIN");

        const existingUser = await client.query(
            "SELECT id FROM users WHERE email = $1",
            [input.email]
        );

        if (existingUser.rowCount && existingUser.rowCount > 0) {
            throw new Error("Email already registered");
        }

        const passwordHash = await bcrypt.hash(input.password, 12);
        // see the comment bellow to see what is the value of the organizationResult
        const organizationResult = await client.query(
            `
      INSERT INTO organizations (name, slug)
      VALUES ($1, $2)
      RETURNING id, name, slug
      `,
            [input.organizationName, input.organizationSlug]
        );

        const organization = organizationResult.rows[0];

        const userResult = await client.query(
            `
      INSERT INTO users (
        organization_id,
        name,
        email,
        password_hash,
        role
      )
      VALUES ($1, $2, $3, $4, 'OWNER')
      RETURNING id, name, email, role
      `,
            [
                organization.id,
                input.name,
                input.email,
                passwordHash
            ]
        );

        await client.query("COMMIT");

        return {
            organization,
            user: userResult.rows[0]
        };
    } catch (error) {
        await client.query("ROLLBACK");
        throw error;
    } finally {
        client.release();
    }
}
// this is the return of organizationResult

// {
//   rows: [
//     {
//       id: "4ab7ef82-b234-4e74-9fc5-123456789abc",
//       name: "Future Coding Center",
//       slug: "future-coding-center"
//     }
//   ],
//   rowCount: 1
// }

export async function login(input: LoginInput) {
    const result = await pool.query(
        `
    SELECT
      id,
      organization_id,
      name,
      email,
      password_hash,
      role
    FROM users
    WHERE email = $1
    `,
        [input.email]
    );

    if (result.rowCount === 0) {
        throw new Error("Invalid email or password");
    }

    const user = result.rows[0];
    const passwordMatches = await bcrypt.compare(
        input.password,
        user.password_hash
    );

    if (!passwordMatches) {
        throw new Error("Invalid email or password");
    }



    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
        throw new Error("JWT_SECRET is not defined");
    }

    const token = jwt.sign(
        {
            userId: user.id,
            organizationId: user.organization_id,
            role: user.role
        },
        jwtSecret,
        {
            expiresIn: "1h"
        }
    );

    return {
        token,
        user: {
            id: user.id,
            organizationId: user.organization_id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    };


}