const bcrypt = require("bcryptjs");
import { Model, DataTypes, Optional } from "sequelize";
import { sequelizeConnection } from "..";
import { signToken } from "../../server/controller/token";
// import setExpired from "../../server/utils/expired-token";
import {
  Area,
  AuthAttribute,
  Departement,
  EmploymentStatus,
  SubDepartement,
  userActive,
} from "./interface";

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
  public employments?: string;
  public userActive?: string;
  public area?: string;
  public departement?: string;
  public subdepartement?: string | undefined;
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
    employments: {
      type: DataTypes.ENUM(...Object.values(EmploymentStatus)),
      allowNull: false,
    },
    userActive: {
      type: DataTypes.ENUM(...Object.values(userActive)),
      allowNull: false,
    },
    area: {
      type: DataTypes.ENUM(...Object.values(Area)),
      allowNull: false,
    },
    departement: {
      type: DataTypes.ENUM(...Object.values(Departement)),
      allowNull: false,
    },
    subdepartement: {
      type: DataTypes.ENUM(...Object.values(SubDepartement)),
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

    // tokenExpired: {
    //   type: DataTypes.VIRTUAL,
    //   get() {
    //     return setExpired();
    //   },
    // },
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

AuthProvider.afterValidate(async (User) => {
  const token = signToken(User);
  User.token = token;
  // const salt = bcrypt.genSaltSync(10);
  // const token = bcrypt.hashSync(User.email, salt);
});

export default AuthProvider;
