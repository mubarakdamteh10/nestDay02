
export function getJwtSecret(): string {
    const secret = process.env.JWT_SECRET;
    secret?.toString();
    if (!secret) {
        throw new Error("JWT secret is not defined");
    }
    return secret;
}
export const JWTToken = "kuy"