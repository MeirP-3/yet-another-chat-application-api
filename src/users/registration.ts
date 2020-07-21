import User from "./user.dao"

export const registerUser = async (username: string) => {

  try {
    const newUser = User.build({username});
    await newUser.save();

    return {
      success: true
    };

  } catch (error) {

    if (!(error?.name?.includes('UniqueConstraintError'))) {
      throw error;
    }

    return {
      success: false,
      message: 'nickname currently in use'
    }
  }
}


export const unregisterUser = async (username: string) => {
  const result = await User.destroy({ where: { username } });

  if (result !== 1) {
    throw new Error(`unexpected result: ${result} from delete user ${username}. expected 1`);
  }
}