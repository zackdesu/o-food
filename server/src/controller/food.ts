import { Request, Response } from "express";
import prisma from "../lib/prisma";

export const foodCreate = (req: Request, res: Response) => {
  void (async () => {
    try {
      const { name, description, price } = req.body as {
        name: string;
        description?: string;
        price: number;
      };

      if (!name)
        throw res.status(403).json({ message: "Product name can't be empty" });
      if (name.length < 4)
        throw res
          .status(403)
          .json({ message: "Product name can't less than 4 character" });
      if (!price)
        throw res.status(403).json({ message: "Product price can't be empty" });

      const create = await prisma.food.create({
        data: { name, description, price },
      });

      if (!create) throw res.status(500);

      return res
        .status(200)
        .json({ create, message: "Product created successfully" });
    } catch (error) {
      return error;
    } finally {
      await prisma.$disconnect();
    }
  })();
};

export const foodList = (req: Request, res: Response) => {
  void (async () => {
    try {
      const foods = await prisma.food.findMany();
      if (!foods) return res.status(404).json({ message: "Food not found!" });

      return res.status(200).json(foods);
    } catch (error) {
      return error;
    } finally {
      await prisma.$disconnect();
    }
  })();
};

export const foodDelete = (req: Request, res: Response) => {
  void (async () => {
    try {
      const { id } = req.params as { id: string };
      console.log(id);
      if (!id) return res.status(403).json({ message: "ID not found" });

      const deleteFood = await prisma.food.delete({
        where: {
          id,
        },
      });

      if (!deleteFood) return res.status(500);

      return res.status(200).json({ message: "Food deleted successfully!" });
    } catch (error) {
      return error;
    } finally {
      await prisma.$disconnect();
    }
  })();
};
