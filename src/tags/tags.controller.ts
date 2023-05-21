import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag } from '@app/types/tag.type';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Get()
  GetAll(): Array<Tag> {
    return this.tagsService.getAll();
  }

  @Get('/:id')
  getTagById(@Param('id') id: string): Tag | string {
    return this.tagsService.getTagById(id);
  }

  @Post()
  createTag(@Body() newTag: CreateTagDto): string {
    return this.tagsService.createTag(newTag);
  }

  @Put('/:id')
  updateTagById(
    @Param('id') id: string,
    @Body() updateTagData: UpdateTagDto,
  ): string {
    return this.tagsService.updateTagById(id, updateTagData);
  }

  @Delete('/:id')
  removeTagById(@Param('id') id: string): string {
    return this.tagsService.removeTagById(id);
  }
}
