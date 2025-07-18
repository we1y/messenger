import { Injectable } from '@nestjs/common';
import {PrismaService} from "../prisma.service";

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}

    async createUser(data: { username: string, phone: string}) {
        return this.prisma.user.create({
            data: {
                username: data.username,
                phone: data.phone,
            }
        })
    }
}