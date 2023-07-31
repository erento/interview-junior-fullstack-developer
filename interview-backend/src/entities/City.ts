import { Injectable } from "@nestjs/common";

@Injectable()
class City {
  public uuid: string = "unknown";
  public cityName: string ="unknown";
  public count: number = 0;
}

export default City;