import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const ADMIN_USERNAME = process.env.ADMIN_USERNAME
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD

// Don't hash at top level - do it inside the function
let ADMIN_PASSWORD_HASH: string | null = null

// Helper function to initialize the password hash
async function initializePasswordHash() {
  if (!ADMIN_PASSWORD) {
    console.error('ADMIN_PASSWORD environment variable is not set')
    return
  }
  
  try {
    ADMIN_PASSWORD_HASH = await bcrypt.hash(ADMIN_PASSWORD, 10)
    console.log('Admin password hash initialized')
  } catch (error) {
    console.error('Error hashing admin password:', error)
  }
}

// Initialize on module load (but handle errors)
initializePasswordHash()

const users = [
  { 
    username: ADMIN_USERNAME, 
    passwordHash: ADMIN_PASSWORD_HASH 
  }
]

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json()

    // Validate input
    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      )
    }

    console.log('Sign-in attempt for:', username)
    console.log('Admin username from env:', ADMIN_USERNAME)

    // Check if environment variables are set
    if (!ADMIN_USERNAME || !ADMIN_PASSWORD) {
      console.error('Admin credentials not configured in environment variables')
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      )
    }

    // Check if password hash is ready
    if (!ADMIN_PASSWORD_HASH) {
      console.error('Password hash not initialized')
      return NextResponse.json(
        { error: 'Server not ready' },
        { status: 503 }
      )
    }

    const user = users.find((user) => user.username === username)

    if (!user) {
      console.log('User not found:', username)
      return NextResponse.json(
        { error: 'Invalid credentials' }, 
        { status: 401 }
      )
    }

    // Use async compare instead of compareSync for better performance
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash!)

    if (isPasswordValid) {
      // Check if JWT_SECRET is set
      if (!process.env.JWT_SECRET) {
        console.error('JWT_SECRET environment variable is not set')
        return NextResponse.json(
          { error: 'Server configuration error' },
          { status: 500 }
        )
      }

      const token = jwt.sign(
        { username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      )

      const response = NextResponse.json(
        { 
          message: 'Sign-in successful',
          user: { username: user.username }
        },
        { status: 200 }
      )

      response.cookies.set('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 3600, // 1 hour
        path: '/',
        sameSite: 'strict'
      })

      console.log('Admin sign-in successful for:', username)
      return response
    }

    console.log('Invalid password for user:', username)
    return NextResponse.json(
      { error: 'Invalid credentials' }, 
      { status: 401 }
    )

  } catch (error) {
    console.error('Error during sign-in:', error)
    return NextResponse.json(
      { error: 'An error occurred during sign-in' }, 
      { status: 500 }
    )
  }
}