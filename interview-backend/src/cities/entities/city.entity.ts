import { ApiProperty } from '@nestjs/swagger';

export class City {
  @ApiProperty({
    example: '93068f2d-35b5-4967-9b8d-64e23b6ddc89',
    description: 'The uuid of the city',
  })
  uuid: string;

  @ApiProperty({ example: 'Hamburg', description: 'The name of the city' })
  cityName: string;

  @ApiProperty({
    example: '209',
    description: 'The amount of items that can be rented in the town',
  })
  count: number;
}
