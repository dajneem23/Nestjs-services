import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { LoginRequest, LoginResponse, ValidateTokenRequest, ValidateTokenResponse } from "./grpc/auth.grpc";

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) {}
    async login(request: LoginRequest): Promise<LoginResponse> {
        // Implement your login logic here

        // if (user?.password !== pass) {
        //   throw new UnauthorizedException();
        // }
        // const payload = { sub: user.userId, username: user.username };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }

    async validateToken(request: ValidateTokenRequest): Promise<ValidateTokenResponse> {
        // Implement your token validation logic here
        const valid = request.token === "generated-token"; // Example validation
        return { valid };
    }
}
