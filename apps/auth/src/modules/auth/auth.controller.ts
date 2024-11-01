import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

import { AuthService } from './auth.service';
import { LoginRequest, LoginResponse, ValidateTokenRequest, ValidateTokenResponse } from './grpc/auth.grpc';

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @GrpcMethod('AuthService', 'Login')
    async login(request: LoginRequest): Promise<LoginResponse> {
        return this.authService.login(request);
    }

    @GrpcMethod('AuthService', 'ValidateToken')
    async validateToken(request: ValidateTokenRequest): Promise<ValidateTokenResponse> {
        return this.authService.validateToken(request);
    }
}
