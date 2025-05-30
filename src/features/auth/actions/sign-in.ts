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

const singUpSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters long')
    .max(50, 'Password must be at most 50 characters long'),
})

export const SignIn = async (_actionState: ActionState, formData: FormData) => {
  try {
    const { email, password } = singUpSchema.parse(Object.fromEntries(formData))

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!user) {
      return fromErrorToActionState(
        new Error('Incorrect email or password. Please try again.'),
        formData,
      )
    } else {
      const passwordBytes = stringToUint8Array(password)
      const hashedPasswordBytes = sha256(passwordBytes)
      const hashedPassword = uint8ArrayToHex(hashedPasswordBytes)

      if (user.passwordHash !== hashedPassword) {
        return fromErrorToActionState(
          new Error('Incorrect email or password. Please try again.'),
          formData,
        )
      }

      const token = generateSessionToken()
      const session = await createSession(token, user.id)
      setSessionTokenCookie(token, session.expiresAt)
    }
  } catch (error) {
    return fromErrorToActionState(error, formData)
  }

  redirect(ticketsPath())
}
