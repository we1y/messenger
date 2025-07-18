export class CreatePrivateChatDto {
    userId1: string
    userId2: string
}

export class CreateGroupChatDto {
    ownerId: string
    members: string[]
}