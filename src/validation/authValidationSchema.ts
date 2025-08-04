import * as z from "zod";

/**
 * Zod schema for validating user registration data.
 * This ensures data sent to the backend is in the correct format.
 */
export const registerSchema = z
  .object({
    username: z
      .string()
      .min(3, { message: "Username must be at least 3 characters long." })
      .max(50, { message: "Username must be at most 50 characters long." }),
    email: z.string().email({ message: "Invalid email address." }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long." })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter.",
      })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter.",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number." })
      .regex(/[^a-zA-Z0-9]/, {
        message: "Password must contain at least one special character.",
      }),
    isAdmin: z
      .boolean()
      .default(false)
      .transform((val) => val ?? false),
    adminToken: z.string().optional(),
  })
  .refine(
    (data) => {
      // Conditional validation: if isAdmin is true, adminToken must be a 6-digit string
      if (data.isAdmin) {
        return z
          .string()
          .regex(/^\d{6}$/, "Admin token must be a 6-digit number.")
          .safeParse(data.adminToken).success;
      }
      return true;
    },
    {
      message: "Admin token is required and must be a 6-digit number.",
      path: ["adminToken"],
    }
  );

/**
 * TypeScript type inferred from the Zod schema.
 * This provides strong typing for the data object used in the form.
 */
export type RegisterData = z.infer<typeof registerSchema>;
