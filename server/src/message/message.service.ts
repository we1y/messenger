import { Injectable } from '@nestjs/common';
import { PrismaService } from "../prisma.service";
import { Message } from "../../generated/prisma";


@Injectable()
export class MessageService {
    constructor(private readonly prisma: PrismaService) {}

    async userMessages( userId: string ): Promise<Message[]> {
        return this.prisma.message.findMany({
            where: {
                userId: userId
            },
            include: {
                content: true
            }
        })
    }

    async createMessage(data: { userId: string, chatId: string, text: string }): Promise<Message | null> {
        return this.prisma.message.create({
            data: {
                userId: data.userId,
                chatId: data.chatId,
                content: {
                    create: {
                        text: data.text,
                    }
                }
            },
            include: {
                content: true
            }
        })
    }
}
