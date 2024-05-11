import { Request, Response } from "express";
import User from "../models/User";
import { UserBL } from "../BL/UserBL";
import jwt, { jwtDecode } from "jwt-decode";

export class UserController {
  private userBL: UserBL;

  constructor(userBL: UserBL) {
    this.userBL = userBL;
  }

  async addUser(req: Request, res: Response): Promise<void> {
    const userData = req.body;
    const user = new User(
      userData.user_id,
      userData.first_name,
      userData.surname,
      userData.email,
      userData.color
    );
    try {
      await this.userBL.addUser(user);
      res.status(201).send({ message: `User created successfully` });
    } catch (error) {
      res.status(400).send((error as Error).message);
    }
  }

  async getUser(req: Request, res: Response): Promise<void> {
    const userID = +req.params.id;
    try {
      const user = await this.userBL.getUser(userID);
      res.status(200).send(user);
    } catch (error) {
      res.status(400).send((error as Error).message);
    }
  }

  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const Users = await this.userBL.getAllUsers();
      res.status(200).send(Users);
    } catch (error) {
      res.status(400).send((error as Error).message);
    }
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    const userID = +req.params.id;
    const userData = req.body;
    try {
      await this.userBL.updateUser(userID, userData);
      res.status(200).send({ message: `User ${userID} updated successfully` });
    } catch (error) {
      res.status(400).send((error as Error).message);
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    const userID = +req.params.id;
    try {
      await this.userBL.deleteUser(userID);
      res.status(200).send({ message: `User ${userID} deleted successfully` });
    } catch (error) {
      res.status(400).send((error as Error).message);
    }
  }

  async googleLogin(req: Request, res: Response): Promise<void> {
    const credentials = req.body;
    try {
      // destructure credentials object
      const googleUser = jwtDecode(credentials.credential as string);
      const { email, given_name, family_name } = googleUser as GoogleUser;
      const user = await this.userBL.getUserByEmail(email);
      if (!user) {
        const newUser = new User(0, given_name, family_name, email, "#db2777");
        await this.userBL.addUser(newUser);
        res
          .status(201)
          .send({ message: `User created successfully`, user: newUser });
      }
      res
        .status(200)
        .send({ message: `User logged in successfully`, user: user });
    } catch (error) {
      res.status(400).send((error as Error).message);
      console.log((error as Error).message);
    }
  }
}

interface GoogleUser {
  email: string;
  given_name: string;
  family_name: string;
}
