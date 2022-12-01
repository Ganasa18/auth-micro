"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcryptjs");
const sequelize_1 = require("sequelize");
const __1 = require("..");
class AuthProvider extends sequelize_1.Model {
}
AuthProvider.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: {
                msg: "Please use a valid email address",
            },
            customValidator(value) {
                if (value == null || value == "") {
                    throw new Error("email can't be null or empty");
                }
            },
        },
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
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
}, {
    timestamps: true,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    tableName: "authprovider",
    sequelize: __1.sequelizeConnection,
});
AuthProvider.beforeCreate((User) => __awaiter(void 0, void 0, void 0, function* () {
    const checkUser = yield AuthProvider.findOne({
        where: {
            email: User.email,
        },
    });
    if (checkUser) {
        throw new Error("User already exists");
    }
    else {
        const salt = bcrypt.genSaltSync(10);
        User.password = yield bcrypt.hashSync(User.password, salt);
    }
}));
exports.default = AuthProvider;
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
