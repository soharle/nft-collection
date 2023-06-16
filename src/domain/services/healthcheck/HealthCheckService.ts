
import { injectable } from "tsyringe";
import { HealthCheckResponse } from "../../DTOs/HealthCheckResponse";


@injectable()
export class HealthCheckService {
  public async invoke(): Promise<HealthCheckResponse> {
    return {
      success: true,
      date: new Date().toISOString()
    };
  }
}
export { HealthCheckResponse };

