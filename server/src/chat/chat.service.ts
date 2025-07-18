import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Chat } from "../../generated/prisma";

@Injectable()
export class ChatService {
    constructor(private prisma: PrismaService) {}

    async userChats( userId: string ): Promise<Chat[]> {
        return this.prisma.chat.findMany({
            where: {
                members: {
                    some: {
                        userId: userId
                    }
                }
            },
            include: {
                messages: {
                    include: {
                        content: true
                    }
                }
            }
        })
    }

    async createPrivateChat(data: { userId1: string, userId2: string }): Promise<Chat | null> {
        const user = await this.prisma.user.findUnique({
            where: {
                id: data.userId2,
            }
        })

        return this.prisma.chat.create({
            data: {
                title: user?.username,
                members: {
                    create: [
                        {
                            userId: data.userId1,
                            role: 'MEMBER'
                        },
                        {
                            userId: data.userId2,
                            role: 'MEMBER'
                        }
                    ]
                }
            },
            include: {
                members: true
            }
        })
    }

    async createGroupChat(data: { ownerId: string, members: string[] }) {
        return this.prisma.chat.create({
            data: {
                type: 'GROUP',
                title: 'Group Chat',
                members: {
                    create: [
                        {
                            userId: data.ownerId,
                            role: 'OWNER' as const
                        },
                        ...data.members.map(userId => ({
                            userId,
                            role: 'MEMBER' as const
                        }))
                    ]
                }
            },
            include: {
                members: true
            }
        })
    }
}
