'use server'

import {
  ActionState,
  fromErrorToActionState,
} from '@/components/form/utils/to-action-state'
import { prisma } from '@/lib/prisma'
import {
  createSession,
  generateSessionToken,
  setSessionTokenCookie,
} from '@/lib/session'
import { ticketsPath } from '@/paths'
import { sha256 } from '@oslojs/crypto/sha2'
import { Prisma } from '@prisma/client'
import { redirect } from 'next/navigation'
import { z } from 'zod'

function stringToUint8Array(str: string): Uint8Array {
  return new TextEncoder().encode(str)
}

function uint8ArrayToHex(array: Uint8Array): string {
  return Array.from(array)
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('')
}

const singUpSchema = z
  .object({
    username: z
      .string()
      .min(1, 'Username is required')
      .max(20, 'Username must be at most 20 characters long')
      .refine((value) => {
        const regex = /^[a-zA-Z0-9_-]+$/
        return regex.test(value)
      }),
    email: z.string().email('Invalid email address'),
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters long')
      .max(50, 'Password must be at most 50 characters long'),
    confirmPassword: z
      .string()
      .min(6, 'Confirm Password must be at least 6 characters long')
      .max(50, 'Confirm Password must be at most 50 characters long'),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Passwords do not match',
        path: ['confirmPassword'],
      })
    }
  })

export const SignUp = async (_actionState: ActionState, formData: FormData) => {
  try {
    const { username, email, password } = singUpSchema.parse(
      Object.fromEntries(formData),
    )

    const passwordBytes = stringToUint8Array(password)
    const hashedPasswordBytes = sha256(passwordBytes)
    const hashedPassword = uint8ArrayToHex(hashedPasswordBytes)

    const user = await prisma.user.create({
      data: {
        username,
        email,
        passwordHash: hashedPassword,
      },
    })

    const token = await generateSessionToken()
    const session = await createSession(token, user.id)
    setSessionTokenCookie(token, session.expiresAt)
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return fromErrorToActionState(new Error('user already exist'), formData)
    } else {
      return fromErrorToActionState(error, formData)
    }
  }

  redirect(ticketsPath())
}
