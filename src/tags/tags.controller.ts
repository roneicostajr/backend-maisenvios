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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Tags')
@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all Tags from sheet' })
  @ApiResponse({ status: 200, description: 'Array with all available tags' })
  GetAll(): Array<Tag> {
    return this.tagsService.getAll();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get one Tag from sheet by id (Tag field)' })
  getTagById(@Param('id') id: string): Tag | string {
    return this.tagsService.getTagById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Creates a new Tag' })
  @ApiResponse({ status: 200, description: 'Tag creation status' })
  createTag(@Body() newTag: CreateTagDto): string {
    return this.tagsService.createTag(newTag);
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Updates Tag on sheet by id (Tag field)' })
  @ApiResponse({ status: 200, description: 'Tag update status' })
  updateTagById(
    @Param('id') id: string,
    @Body() updateTagData: UpdateTagDto,
  ): string {
    return this.tagsService.updateTagById(id, updateTagData);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Remove Tags from sheet by id (Tag field)' })
  @ApiResponse({ status: 200, description: 'Tag removal status' })
  removeTagById(@Param('id') id: string): string {
    return this.tagsService.removeTagById(id);
  }
}
