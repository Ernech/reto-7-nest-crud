import { Controller } from '@nestjs/common';
import { SalesService } from 'src/services/sales/sales.service';

@Controller('sales')
export class SalesController {

    constructor(private readonly salesService:SalesService){}

}
