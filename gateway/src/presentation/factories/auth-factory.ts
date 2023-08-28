import { AuthenticateService } from "@/domain/use-cases/authenticate";
import { JwtProvider } from "@/infra/providers/jwt";
import { AuthController } from "../controllers/auth-controller";

export function makeAuthController() {
  const jwtProvider = new JwtProvider();
  const authenticateService = new AuthenticateService(jwtProvider);
  const authController = new AuthController(authenticateService);
  return authController;
}
