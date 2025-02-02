import { z } from "zod"

export const InfoFormSchema = z.object({
    email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
    name: z
        .string()
        .min(4, { message: 'Name must be at least 4 characters long.' })
        .trim(),
});

export const PasswordFormSchema = z.object({
    currentPass: z.string().min(1, { message: 'Current password must not be empty.' }),
    newPass: z.string().min(1, { message: 'New password must not be empty.' }),
    confirmPass: z.string().min(1, { message: 'Confirm password must not be empty.' }),
}).refine((data) => data.newPass === data.confirmPass, {
    message: 'Passwords do not match.',
    path: ['confirmPass'], // Make sure this matches the field name
});