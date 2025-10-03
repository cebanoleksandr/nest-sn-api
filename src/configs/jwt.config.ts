import { ConfigService } from "@nestjs/config";

export const getJwtConfig = async (config: ConfigService) => ({
  secret: config.get<string>('JWT_SECRET'),
});
