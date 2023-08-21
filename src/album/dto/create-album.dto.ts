import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  year: number;
  @IsUUID()
  @IsOptional()
  @ApiPropertyOptional()
  artistId: string | null;
}
