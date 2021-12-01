import bcrypt from 'bcryptjs';

export const hashPassword = async (password:string):Promise<string> => {

    const salt_rounds = 10;
    const hashed_password = await bcrypt.hash(password, salt_rounds);

    return hashed_password;
}

export const comparePassword = async (password:string, hashed_password:string):Promise<boolean> => {

    return await bcrypt.compare(password,hashed_password)
}