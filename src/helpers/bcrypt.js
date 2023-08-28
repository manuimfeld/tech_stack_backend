import bcrypt from "bcrypt";

export const hashPassword = async (plainPassword, saltRounds) => {
  try {
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
    return hashedPassword;
  } catch (err) {
    console.error("Error al generar el hash de la contraseña:", err);
  }
};

export const comparePassword = async (plainPassword, hash) => {
  try {
    const compared = await bcrypt.compare(plainPassword, hash);
    return compared;
  } catch (err) {
    console.log("Error al comparar contraseñas");
  }
};
