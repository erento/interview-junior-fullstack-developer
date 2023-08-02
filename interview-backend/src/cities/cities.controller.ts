import { Controller, Get, Param } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { City } from './entities/city.entity';

@ApiTags('cities')
@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'All cities',
    type: City,
  })
  findAll() {
    return this.citiesService.findAll();
  }

  @Get(':searchString')
  @ApiResponse({
    status: 200,
    description: 'The cities matching the search string, case insensitive',
    type: City,
  })
  findAllMatching(@Param('searchString') searchString: string) {
    return this.citiesService.findAllMatching(searchString);
  }
}
