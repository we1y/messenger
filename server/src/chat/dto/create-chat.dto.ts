import { ApiProperty } from '@nestjs/swagger';

export class CreatePrivateChatDto {
    @ApiProperty()
    userId1: string

    @ApiProperty()
    userId2: string
}

export class CreateGroupChatDto {
    @ApiProperty()
    ownerId: string

    @ApiProperty()
    members: string[]
}