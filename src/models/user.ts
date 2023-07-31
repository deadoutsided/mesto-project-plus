import { Schema, model } from 'mongoose';
import validatorModule from 'validator';

interface IUser {
  name?: string;
  about?: string;
  avatar?: string;
  email: string;
  password: string;
}

const userSchema = new Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 200,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v: string) {
        return validatorModule.isEmail(v);
      },
      message: 'Неподходящий e-mail',
    },
  },
  password: {
    type: String,
    required: true,
  },
});

export default model<IUser>('user', userSchema);
