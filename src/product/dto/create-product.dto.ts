import { Length, Max, Min } from 'class-validator';
export class CreateProductDto {
  @Length(5)
  name: string;

  @Min(1)
  @Max(10e6)
  price: number;
}
