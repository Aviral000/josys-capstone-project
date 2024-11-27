import bcrypt from 'bcryptjs';

export const hashPassword = async (password: string): Promise<string> => {
    const genSalt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, genSalt);
    return hashedPassword;
};

export const verifyPassword = async (password: string, hashedPassword: string) => {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
};