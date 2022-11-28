import * as Sequelize from "sequelize";
import { sequelize } from "..";

export interface AuthAddModel {
  email: string;
  password: string;
}

export interface AuthModel extends Sequelize.Model<AuthModel, AuthAddModel> {
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthViewModel {
  id: number;
  email: string;
}

export const authProvider = sequelize.define<AuthModel, AuthAddModel>(
  "authprovider",
  {
    email: {
      allowNull: false,
      type: Sequelize.DataTypes.STRING,
    },
    password: {
      allowNull: false,
      type: Sequelize.DataTypes.STRING,
    },
  }
);

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
