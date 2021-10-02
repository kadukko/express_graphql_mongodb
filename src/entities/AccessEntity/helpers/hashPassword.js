import crypto from 'crypto'

export default function hashPassword(password, username) {
    return crypto.createHmac('sha256', `${username.toLowerCase()}.${secret}`)
        .update(password)
        .digest('hex')
}