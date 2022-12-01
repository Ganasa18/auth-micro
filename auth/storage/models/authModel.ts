const bcrypt = require("bcryptjs");
import { Model, DataTypes, Optional } from "sequelize";
import { sequelizeConnection } from "..";
import { signToken } from "../../server/controller/token";
import setExpired from "../../server/utils/expired-token";

export interface AuthAttribute {
  id: number;
  email: string;
  password?: string;
  nik: number;
  fullname?: string;
  token?: string;
  firsttime?: boolean;
  updateBy?: string;
  tokenExpired?: string;
}

export interface AuthInput extends Optional<AuthAttribute, "id"> {}
export interface AuthOuput extends Required<AuthAttribute> {}

class AuthProvider
  extends Model<AuthAttribute, AuthInput>
  implements AuthAttribute
{
  public id!: number;
  public email!: string;
  public password?: string | undefined;
  public nik!: number;
  public fullname?: string;
  public firsttime?: boolean;
  public updateBy?: string;
  public token?: string;
}

AuthProvider.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nik: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      validate: {
        customValidator(value: number) {
          if (value.toString().length > 8 || value.toString().length < 8) {
            throw new Error("NIK Must be at least 8 characters");
          }
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: "Please use a valid email address",
        },
        customValidator(value: string) {
          if (value == null || value == "") {
            throw new Error("email can't be null or empty");
          }
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "password is required",
        },
        notEmpty: {
          msg: "please provide a password",
        },
      },
    },

    fullname: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    firsttime: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    updateBy: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    tokenExpired: {
      type: DataTypes.VIRTUAL,
      get() {
        return setExpired();
      },
    },
  },
  {
    timestamps: true,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    tableName: "authprovider",
    sequelize: sequelizeConnection,
  }
);
// Hash password beforeCreate
AuthProvider.beforeCreate(async (User) => {
  const checkUser = await AuthProvider.findOne({
    where: {
      email: User.email,
    },
  });
  if (checkUser) {
    throw new Error("User already exists");
  } else {
    const salt = bcrypt.genSaltSync(10);
    User.password = bcrypt.hashSync(User.password, salt);
  }
});

export default AuthProvider;

AuthProvider.afterValidate(async (User) => {
  const token = signToken(User);
  User.token = token;
  // const salt = bcrypt.genSaltSync(10);
  // const token = bcrypt.hashSync(User.email, salt);
});

// export interface AuthAddModel {
//   email: string;
//   password: string;
// }

// export interface AuthModel extends Model<AuthModel, AuthAddModel> {
//   email: string;
//   password: string;
//   createdAt: string;
//   updatedAt: string;
// }

// export interface AuthViewModel {
//   id: number;
//   email: string;
// }
// export const authProvider = (sequelize: Sequelize) => {
//   sequelize.define<AuthModel, AuthAddModel>(
//     "authprovider",
//     {
//       email: {
//         allowNull: false,
//         type: DataTypes.STRING,
//       },
//       password: {
//         allowNull: false,
//         type: DataTypes.STRING,
//       },
//     },
//     {
//       hooks: {
//         beforeCreate: async (AuthProv: AuthModel) => {
//           await Password.toHash(AuthProv.password);
//         },
//       },
//     }
//   );
// };

// module.exports = authProvider;

// import * as Sequelize from 'sequelize'
// import { sequelize } from '..'

// export interface AuthProviderInterface {
//     email: string
//     password: string
// }

// export interface AuthModel extends Sequelize.Model<AuthModel, AuthProviderInterface> {
//     id: number
//     email: string
//     password: string
//     createdAt: string
//     updatedAt: string
// }

// export interface AuthViewModel {
//     id: number
//     email: string
// }

// export const authProvider = (sequelize: any) => {
//   sequelize.define<AuthModel, UserAddModel>("authprovider", {
//     email: {
//       allowNull: false,
//       type: Sequelize.DataTypes.STRING,
//     },
//     password: {
//       allowNull: false,
//       type: Sequelize.DataTypes.STRING,
//     },
//   });
// };

// export const AuthProvider = sequelize.define<AuthModel, UserAddModel>('authprovider', {

// });

// export const authProvider = (sequelize: any) => {
//   sequelize.define("authprovider", {
//     email: {
//       allowNull: false,
//       type: Sequelize.DataTypes.STRING,
//     },
//     password: {
//       allowNull: false,
//       type: Sequelize.DataTypes.STRING,
//     },
//   });
// };

// type AuthAttribute = {
//   id: number;
//   email: string;
//   password: string;
// };

// type AuthCreationAttribute = Optional<AuthAttribute, "id">;

// export class Auth extends Model<AuthAttribute, AuthCreationAttribute> {
//   declare id: CreationOptional<number>;
//   declare email: string;
//   declare password: string;
// }
