"use strict";

import { Table, Column, Model } from "sequelize-typescript";

import PassportProvider from "../../passport/PassportProvider";

@Table
export default class User extends Model {
  @Column
  name: string;

  @Column
  email: string;

  @Column
  username: string;

  @Column
  provider: PassportProvider;

  /**
   * ============================
   * Class Functions
   * ============================
   */

  // Getters
  public getName(): string {
    return this.getDataValue("name");
  }

  public getEmail(): string {
    return this.getDataValue("email");
  }

  public getUsername(): string | null {
    return this.getDataValue("username");
  }

  // Setters
  public setName(name: string): this {
    this.setDataValue("name", name);
    return this;
  }

  public setEmail(email: string): this {
    this.setDataValue("email", email);
    return this;
  }

  public setUsername(username: string): this {
    this.setDataValue("username", username);
    return this;
  }

  /**
   * ============================
   * Helper Functions
   * ============================
   */

  public static async gen(id: number): Promise<User | null> {
    return await User.findOne({ where: { id } });
  }
}
