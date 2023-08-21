import { PartialType } from '@nestjs/mapped-types';
import { CreateFavoriteDto } from './create-favorite.dto';

export class UpdateFavouriteDto extends PartialType(CreateFavoriteDto) {}
