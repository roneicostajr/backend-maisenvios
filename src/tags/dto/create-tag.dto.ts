import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateTagDto {
  @IsString()
  @ApiProperty()
  readonly Tag: string;

  @IsString()
  @ApiProperty()
  readonly name: string;

  @IsNumber()
  @ApiProperty()
  readonly status: number;

  @IsNumber()
  @ApiProperty()
  readonly source: number;

  @IsNumber()
  @ApiProperty()
  readonly price: number;
}
