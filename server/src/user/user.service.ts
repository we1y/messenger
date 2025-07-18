import { Injectable } from '@nestjs/common';
import { PrismaService } from "../prisma.service";
import { User } from "../../generated/prisma";

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}

    async users(): Promise<User[]> {
        return this.prisma.user.findMany();
    }

    async createUser(data: { username: string, phone: string}): Promise<User | null> {
        return this.prisma.user.create({
            data: {
                username: data.username,
                phone: data.phone,
            }
        })
    }
}