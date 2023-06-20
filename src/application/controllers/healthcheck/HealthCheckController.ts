import { Controller, Get, Route, Tags } from 'tsoa';
import { HealthCheckResponse, HealthCheckService } from '../../../domain/services/healthcheck/HealthCheckService';
import { injectable } from 'tsyringe';
import { MoralisApi } from '../../../domain/services/thirdparty/MoralisApi';

@Route("/")
@injectable()
export class HealthCheckController extends Controller {
  constructor(private healthCheckService: HealthCheckService, private api: MoralisApi) {
    super()
  }
  @Tags("HealthCheck")
  @Get("/health")
  public async invoke(): Promise<HealthCheckResponse> {
    return await this.healthCheckService.invoke();
  }
}


