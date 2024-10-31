// src/grpc/auth.grpc.ts
/* eslint-disable */
import * as grpc from '@grpc/grpc-js';
import { GrpcObject } from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import * as path from 'path';

const PROTO_PATH = path.join(__dirname, '../../protos/auth.proto');

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
});

const authProto = grpc.loadPackageDefinition(packageDefinition) as unknown as any;
export interface IAuthService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    login: grpc.MethodDefinition<LoginRequest, LoginResponse>;
    validateToken: grpc.MethodDefinition<ValidateTokenRequest, ValidateTokenResponse>;
}

export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    token: string;
}

export interface ValidateTokenRequest {
    token: string;
}

export interface ValidateTokenResponse {
    valid: boolean;
}

export const AuthGrpcService: IAuthService = authProto.auth.AuthService;

export const authServiceClient = new authProto.auth.AuthService(
    'localhost:50051',
    grpc.credentials.createInsecure(),
) as grpc.Client;
