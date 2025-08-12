import { z } from "zod";

const UserSchema = z.object({
  firstName: z
    .string()
    .nonempty("First name is required")
    .min(2, { message: "First name must be at least 2 characters long" })
    .max(50, { message: "First name cannot exceed 50 characters" })
    .trim()
    .regex(/^[a-zA-Z\s-]+$/, {
      message: "First name can only contain letters, spaces, and hyphens",
    }),

  lastName: z
    .string()
    .nonempty("Last name is required")
    .min(2, { message: "Last name must be at least 2 characters long" })
    .max(50, { message: "Last name cannot exceed 50 characters" })
    .trim()
    .regex(/^[a-zA-Z\s-]+$/, {
      message: "Last name can only contain letters, spaces, and hyphens",
    }),

  email: z
    .email({ message: "Invalid email format" })
    .min(1, "Email is required")
    .max(255, { message: "Email cannot exceed 255 characters" })
    .transform((val) => val.trim().toLowerCase()),

  password: z
    .string()
    .nonempty("Password is required")
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(100, { message: "Password cannot exceed 100 characters" })
    .refine((val) => /[A-Z]/.test(val), {
      message: "Password must contain at least one uppercase letter",
    })
    .refine((val) => /[a-z]/.test(val), {
      message: "Password must contain at least one lowercase letter",
    })
    .refine((val) => /\d/.test(val), {
      message: "Password must contain at least one number",
    })
    .refine((val) => /[!@#$%^&*]/.test(val), {
      message:
        "Password must contain at least one special character (!@#$%^&*)",
    })
    .refine((val) => /^[A-Za-z\d!@#$%^&*]+$/.test(val), {
      message:
        "Password can only contain letters, numbers, and special characters (!@#$%^&*)",
    }),
});

const UserQuerySchema = z.object({
  page: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : 1))
    .refine((val) => !isNaN(val) && val > 0, {
      message: "Page must be a positive number",
    }),
  size: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : 25))
    .refine((val) => !isNaN(val) && val > 0, {
      message: "Size must be a positive number",
    }),
});

export { UserSchema, UserQuerySchema };
