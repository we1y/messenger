import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateGroupChatDto, CreatePrivateChatDto } from "./dto/create-chat.dto";


@Controller('chats')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('create-private-chat')
  async createPrivateChat(@Body() dto: CreatePrivateChatDto) {
    return this.chatService.createPrivateChat(dto)
  }

  @Post('create-group-chat')
  async createGroupChat(@Body() dto: CreateGroupChatDto) {
    return this.chatService.createGroupChat(dto)
  }

  @Get(':userId')
  async userChats(@Param('userId') userId: string) {
    return this.chatService.userChats(userId)
  }
}
