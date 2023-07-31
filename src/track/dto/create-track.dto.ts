import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;
  @IsUUID()
  @IsOptional()
  @ApiPropertyOptional()
  artistId?: string;
  @IsUUID()
  @IsOptional()
  @ApiPropertyOptional()
  albumId?: string;
  @IsNumber()
  @ApiProperty()
  duration: number;
}
