import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from "./dto/create-message.dto";


@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post('create')
  async createMessage(@Body() dto: CreateMessageDto) {
    return this.messageService.createMessage(dto)
  }

  @Get(':userId')
  async userMessages(@Param('userId') userId: string) {
    return this.messageService.userMessages(userId)
  }
}
