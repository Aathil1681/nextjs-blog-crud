import { z } from "zod";

const userRegiterSchema = z.object({
  firstName: z
    .string()
    .nonempty("firstName is required")
    .min(2, { message: "firstName should contain atleast 2 characters" })
    .max(100, {
      message: "firstName should not exceed more than 100 characters",
    })
    .regex(/^[a-zA-Z\d\s-]+$/, {
      message: "firstName can only contain letters, numbers, space and hypine",
    }),

  lastName: z
    .string()
    .nonempty("lastName is required")
    .min(2, { message: "lastName should contain atleast 2 characters" })
    .max(100, {
      message: "lastName should not exceed more than 100 characters",
    })
    .regex(/^[a-zA-Z\d\s-]+$/, {
      message: "lastName can only contain letters, numbers, space and hypine",
    }),

  email: z
    .string()
    .nonempty("email id is required")
    .email({ message: "invalid email format" })
    .toLowerCase()
    .trim()
    .max(100, { message: "email id cannot have more than 100 characters" }),

  password: z
    .string()
    .nonempty("password is required")
    .min(8, { message: "password should contain atleast 8 characters" })
    .trim()
    .refine((val) => /[a-z]/.test(val), {
      message: "password should contain atleast one lowercase letter",
    })
    .refine((val) => /[A-Z]/.test(val), {
      message: "password should contain atleast one uppercase letter",
    })
    .refine((val) => /[\d]/.test(val), {
      message: "password should contain atleast one number",
    })
    .refine((val) => /[!@#$%^&*]/.test(val), {
      message: "password should contain a special character",
    })
    .refine((val) => /^[a-zA-Z\d!@#$%^&*]+$/.test(val), {
      message: "password can contain only letters, numbers, special characters",
    }),
});

const userLoginSchema = z.object({
  email: z
    .string()
    .nonempty("email is required")
    .email({ message: "invalid email format" })
    .toLowerCase(),

  password: z
    .string()
    .nonempty("password is required")
    .min(8, { message: "password should be atleast 8 characters" })
    .trim(),
});

export { userRegiterSchema, userLoginSchema };
