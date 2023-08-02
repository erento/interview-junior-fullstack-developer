import { Controller, Get, Param, Query } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaginatedCities } from './paginationResponse';

@ApiTags('cities')
@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Get()
  @ApiOperation({ summary: 'Get a paginated list of all cities' })
  @ApiQuery({
    name: 'page',
    type: Number,
    required: false,
    description: 'the required page',
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    type: Number,
    required: false,
    description: 'the amount of cities per page',
    example: 5,
  })
  @ApiResponse({
    status: 200,
    description: 'A paginated list of all cities',
    type: PaginatedCities,
  })
  findAll(@Query('page') page = 1, @Query('limit') limit = 5) {
    return this.citiesService.findAll(+page, +limit);
  }

  @Get(':searchString')
  @ApiOperation({ summary: 'Search for cities matching a name' })
  @ApiQuery({
    name: 'page',
    type: Number,
    required: false,
    description: 'the required page',
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    type: Number,
    required: false,
    description: 'the amount of cities per page',
    example: 5,
  })
  @ApiResponse({
    status: 200,
    description: 'List of cities matching the search string, case insensitive',
    type: PaginatedCities,
  })
  findAllMatching(
    @Param('searchString') searchString: string,
    @Query('page') page = 1,
    @Query('limit') limit = 5,
  ) {
    return this.citiesService.findAllMatching(searchString, +page, +limit);
  }
}
