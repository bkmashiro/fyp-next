// This file is auto-generated by @hey-api/openapi-ts

import { createClient, createConfig, type Options } from '@hey-api/client-axios';
import type { GetHelloError, GetHelloResponse, CreateData, CreateError, CreateResponse, FindAllError, FindAllResponse, FindOneData, FindOneError, FindOneResponse, UpdateData, UpdateError, UpdateResponse, RemoveData, RemoveError, RemoveResponse, Create1Data, Create1Error, Create1Response, FindAll1Error, FindAll1Response, FindOne1Data, FindOne1Error, FindOne1Response, Update1Data, Update1Error, Update1Response, Remove1Data, Remove1Error, Remove1Response, Create2Data, Create2Error, Create2Response, FindAll2Error, FindAll2Response, FindOne2Data, FindOne2Error, FindOne2Response, Update2Data, Update2Error, Update2Response, Remove2Data, Remove2Error, Remove2Response, Create3Data, Create3Error, Create3Response, FindAll3Error, FindAll3Response, FindOne3Data, FindOne3Error, FindOne3Response, Update3Data, Update3Error, Update3Response, Remove3Data, Remove3Error, Remove3Response, Create4Data, Create4Error, Create4Response, FindAll4Error, FindAll4Response, FindOne4Data, FindOne4Error, FindOne4Response, Update4Data, Update4Error, Update4Response, Remove4Data, Remove4Error, Remove4Response, RegisterData, RegisterError, RegisterResponse, GetOneData, GetOneError, GetOneResponse, UpdateOneData, UpdateOneError, UpdateOneResponse, ReplaceOneData, ReplaceOneError, ReplaceOneResponse, DeleteOneData, DeleteOneError, DeleteOneResponse, GetManyData, GetManyError, GetManyResponse, CreateOneData, CreateOneError, CreateOneResponse, CreateManyData, CreateManyError, CreateManyResponse, LoginData, LoginError, LoginResponse, GetProfileError, GetProfileResponse, TestError, TestResponse, GetDictData, GetDictError, GetDictResponse, GetAllError, GetAllResponse, UploadFileError, UploadFileResponse, GetFileData, GetFileError, GetFileResponse } from './types.gen';

export const client = createClient(createConfig());

export class DefaultService {
    public static getHello<ThrowOnError extends boolean = false>(options?: Options<unknown, ThrowOnError>) {
        return (options?.client ?? client).get<GetHelloResponse, GetHelloError, ThrowOnError>({
            ...options,
            url: '/'
        });
    }
    
    public static create<ThrowOnError extends boolean = false>(options: Options<CreateData, ThrowOnError>) {
        return (options?.client ?? client).post<CreateResponse, CreateError, ThrowOnError>({
            ...options,
            url: '/geo-object'
        });
    }
    
    public static findAll<ThrowOnError extends boolean = false>(options?: Options<unknown, ThrowOnError>) {
        return (options?.client ?? client).get<FindAllResponse, FindAllError, ThrowOnError>({
            ...options,
            url: '/geo-object'
        });
    }
    
    public static findOne<ThrowOnError extends boolean = false>(options: Options<FindOneData, ThrowOnError>) {
        return (options?.client ?? client).get<FindOneResponse, FindOneError, ThrowOnError>({
            ...options,
            url: '/geo-object/{id}'
        });
    }
    
    public static update<ThrowOnError extends boolean = false>(options: Options<UpdateData, ThrowOnError>) {
        return (options?.client ?? client).patch<UpdateResponse, UpdateError, ThrowOnError>({
            ...options,
            url: '/geo-object/{id}'
        });
    }
    
    public static remove<ThrowOnError extends boolean = false>(options: Options<RemoveData, ThrowOnError>) {
        return (options?.client ?? client).delete<RemoveResponse, RemoveError, ThrowOnError>({
            ...options,
            url: '/geo-object/{id}'
        });
    }
    
    public static create1<ThrowOnError extends boolean = false>(options: Options<Create1Data, ThrowOnError>) {
        return (options?.client ?? client).post<Create1Response, Create1Error, ThrowOnError>({
            ...options,
            url: '/geo-image'
        });
    }
    
    public static findAll1<ThrowOnError extends boolean = false>(options?: Options<unknown, ThrowOnError>) {
        return (options?.client ?? client).get<FindAll1Response, FindAll1Error, ThrowOnError>({
            ...options,
            url: '/geo-image'
        });
    }
    
    public static findOne1<ThrowOnError extends boolean = false>(options: Options<FindOne1Data, ThrowOnError>) {
        return (options?.client ?? client).get<FindOne1Response, FindOne1Error, ThrowOnError>({
            ...options,
            url: '/geo-image/{id}'
        });
    }
    
    public static update1<ThrowOnError extends boolean = false>(options: Options<Update1Data, ThrowOnError>) {
        return (options?.client ?? client).patch<Update1Response, Update1Error, ThrowOnError>({
            ...options,
            url: '/geo-image/{id}'
        });
    }
    
    public static remove1<ThrowOnError extends boolean = false>(options: Options<Remove1Data, ThrowOnError>) {
        return (options?.client ?? client).delete<Remove1Response, Remove1Error, ThrowOnError>({
            ...options,
            url: '/geo-image/{id}'
        });
    }
    
    public static create2<ThrowOnError extends boolean = false>(options: Options<Create2Data, ThrowOnError>) {
        return (options?.client ?? client).post<Create2Response, Create2Error, ThrowOnError>({
            ...options,
            url: '/geo-comment'
        });
    }
    
    public static findAll2<ThrowOnError extends boolean = false>(options?: Options<unknown, ThrowOnError>) {
        return (options?.client ?? client).get<FindAll2Response, FindAll2Error, ThrowOnError>({
            ...options,
            url: '/geo-comment'
        });
    }
    
    public static findOne2<ThrowOnError extends boolean = false>(options: Options<FindOne2Data, ThrowOnError>) {
        return (options?.client ?? client).get<FindOne2Response, FindOne2Error, ThrowOnError>({
            ...options,
            url: '/geo-comment/{id}'
        });
    }
    
    public static update2<ThrowOnError extends boolean = false>(options: Options<Update2Data, ThrowOnError>) {
        return (options?.client ?? client).patch<Update2Response, Update2Error, ThrowOnError>({
            ...options,
            url: '/geo-comment/{id}'
        });
    }
    
    public static remove2<ThrowOnError extends boolean = false>(options: Options<Remove2Data, ThrowOnError>) {
        return (options?.client ?? client).delete<Remove2Response, Remove2Error, ThrowOnError>({
            ...options,
            url: '/geo-comment/{id}'
        });
    }
    
    public static create3<ThrowOnError extends boolean = false>(options: Options<Create3Data, ThrowOnError>) {
        return (options?.client ?? client).post<Create3Response, Create3Error, ThrowOnError>({
            ...options,
            url: '/storyboard'
        });
    }
    
    public static findAll3<ThrowOnError extends boolean = false>(options?: Options<unknown, ThrowOnError>) {
        return (options?.client ?? client).get<FindAll3Response, FindAll3Error, ThrowOnError>({
            ...options,
            url: '/storyboard'
        });
    }
    
    public static findOne3<ThrowOnError extends boolean = false>(options: Options<FindOne3Data, ThrowOnError>) {
        return (options?.client ?? client).get<FindOne3Response, FindOne3Error, ThrowOnError>({
            ...options,
            url: '/storyboard/{id}'
        });
    }
    
    public static update3<ThrowOnError extends boolean = false>(options: Options<Update3Data, ThrowOnError>) {
        return (options?.client ?? client).patch<Update3Response, Update3Error, ThrowOnError>({
            ...options,
            url: '/storyboard/{id}'
        });
    }
    
    public static remove3<ThrowOnError extends boolean = false>(options: Options<Remove3Data, ThrowOnError>) {
        return (options?.client ?? client).delete<Remove3Response, Remove3Error, ThrowOnError>({
            ...options,
            url: '/storyboard/{id}'
        });
    }
    
    public static create4<ThrowOnError extends boolean = false>(options: Options<Create4Data, ThrowOnError>) {
        return (options?.client ?? client).post<Create4Response, Create4Error, ThrowOnError>({
            ...options,
            url: '/scene'
        });
    }
    
    public static findAll4<ThrowOnError extends boolean = false>(options?: Options<unknown, ThrowOnError>) {
        return (options?.client ?? client).get<FindAll4Response, FindAll4Error, ThrowOnError>({
            ...options,
            url: '/scene'
        });
    }
    
    public static findOne4<ThrowOnError extends boolean = false>(options: Options<FindOne4Data, ThrowOnError>) {
        return (options?.client ?? client).get<FindOne4Response, FindOne4Error, ThrowOnError>({
            ...options,
            url: '/scene/{id}'
        });
    }
    
    public static update4<ThrowOnError extends boolean = false>(options: Options<Update4Data, ThrowOnError>) {
        return (options?.client ?? client).patch<Update4Response, Update4Error, ThrowOnError>({
            ...options,
            url: '/scene/{id}'
        });
    }
    
    public static remove4<ThrowOnError extends boolean = false>(options: Options<Remove4Data, ThrowOnError>) {
        return (options?.client ?? client).delete<Remove4Response, Remove4Error, ThrowOnError>({
            ...options,
            url: '/scene/{id}'
        });
    }
    
}

export class UserService {
    public static register<ThrowOnError extends boolean = false>(options: Options<RegisterData, ThrowOnError>) {
        return (options?.client ?? client).post<RegisterResponse, RegisterError, ThrowOnError>({
            ...options,
            url: '/user/register'
        });
    }
    
    /**
     * Retrieve a single User
     */
    public static getOne<ThrowOnError extends boolean = false>(options: Options<GetOneData, ThrowOnError>) {
        return (options?.client ?? client).get<GetOneResponse, GetOneError, ThrowOnError>({
            ...options,
            url: '/user/{id}'
        });
    }
    
    /**
     * Update a single User
     */
    public static updateOne<ThrowOnError extends boolean = false>(options: Options<UpdateOneData, ThrowOnError>) {
        return (options?.client ?? client).patch<UpdateOneResponse, UpdateOneError, ThrowOnError>({
            ...options,
            url: '/user/{id}'
        });
    }
    
    /**
     * Replace a single User
     */
    public static replaceOne<ThrowOnError extends boolean = false>(options: Options<ReplaceOneData, ThrowOnError>) {
        return (options?.client ?? client).put<ReplaceOneResponse, ReplaceOneError, ThrowOnError>({
            ...options,
            url: '/user/{id}'
        });
    }
    
    /**
     * Delete a single User
     */
    public static deleteOne<ThrowOnError extends boolean = false>(options: Options<DeleteOneData, ThrowOnError>) {
        return (options?.client ?? client).delete<DeleteOneResponse, DeleteOneError, ThrowOnError>({
            ...options,
            url: '/user/{id}'
        });
    }
    
    /**
     * Retrieve multiple Users
     */
    public static getMany<ThrowOnError extends boolean = false>(options?: Options<GetManyData, ThrowOnError>) {
        return (options?.client ?? client).get<GetManyResponse, GetManyError, ThrowOnError>({
            ...options,
            url: '/user'
        });
    }
    
    /**
     * Create a single User
     */
    public static createOne<ThrowOnError extends boolean = false>(options: Options<CreateOneData, ThrowOnError>) {
        return (options?.client ?? client).post<CreateOneResponse, CreateOneError, ThrowOnError>({
            ...options,
            url: '/user'
        });
    }
    
    /**
     * Create multiple Users
     */
    public static createMany<ThrowOnError extends boolean = false>(options: Options<CreateManyData, ThrowOnError>) {
        return (options?.client ?? client).post<CreateManyResponse, CreateManyError, ThrowOnError>({
            ...options,
            url: '/user/bulk'
        });
    }
    
}

export class AuthService {
    public static login<ThrowOnError extends boolean = false>(options: Options<LoginData, ThrowOnError>) {
        return (options?.client ?? client).post<LoginResponse, LoginError, ThrowOnError>({
            ...options,
            url: '/auth/auth/login'
        });
    }
    
    public static getProfile<ThrowOnError extends boolean = false>(options?: Options<unknown, ThrowOnError>) {
        return (options?.client ?? client).get<GetProfileResponse, GetProfileError, ThrowOnError>({
            ...options,
            url: '/auth/profile'
        });
    }
    
    public static test<ThrowOnError extends boolean = false>(options?: Options<unknown, ThrowOnError>) {
        return (options?.client ?? client).get<TestResponse, TestError, ThrowOnError>({
            ...options,
            url: '/auth/test'
        });
    }
    
}

export class RoleService {
    public static create<ThrowOnError extends boolean = false>(options: Options<CreateData, ThrowOnError>) {
        return (options?.client ?? client).post<CreateResponse, CreateError, ThrowOnError>({
            ...options,
            url: '/role'
        });
    }
    
    public static findAll<ThrowOnError extends boolean = false>(options?: Options<unknown, ThrowOnError>) {
        return (options?.client ?? client).get<FindAllResponse, FindAllError, ThrowOnError>({
            ...options,
            url: '/role'
        });
    }
    
    public static findOne<ThrowOnError extends boolean = false>(options: Options<FindOneData, ThrowOnError>) {
        return (options?.client ?? client).get<FindOneResponse, FindOneError, ThrowOnError>({
            ...options,
            url: '/role/{id}'
        });
    }
    
    public static update<ThrowOnError extends boolean = false>(options: Options<UpdateData, ThrowOnError>) {
        return (options?.client ?? client).patch<UpdateResponse, UpdateError, ThrowOnError>({
            ...options,
            url: '/role/{id}'
        });
    }
    
    public static remove<ThrowOnError extends boolean = false>(options: Options<RemoveData, ThrowOnError>) {
        return (options?.client ?? client).delete<RemoveResponse, RemoveError, ThrowOnError>({
            ...options,
            url: '/role/{id}'
        });
    }
    
}

export class FceService {
    public static getDict<ThrowOnError extends boolean = false>(options: Options<GetDictData, ThrowOnError>) {
        return (options?.client ?? client).get<GetDictResponse, GetDictError, ThrowOnError>({
            ...options,
            url: '/faster-crud/dict/{entity}'
        });
    }
    
    public static getAll<ThrowOnError extends boolean = false>(options?: Options<unknown, ThrowOnError>) {
        return (options?.client ?? client).get<GetAllResponse, GetAllError, ThrowOnError>({
            ...options,
            url: '/faster-crud/all'
        });
    }
    
}

export class FileService {
    public static uploadFile<ThrowOnError extends boolean = false>(options?: Options<unknown, ThrowOnError>) {
        return (options?.client ?? client).post<UploadFileResponse, UploadFileError, ThrowOnError>({
            ...options,
            url: '/file/upload'
        });
    }
    
    public static getFile<ThrowOnError extends boolean = false>(options: Options<GetFileData, ThrowOnError>) {
        return (options?.client ?? client).get<GetFileResponse, GetFileError, ThrowOnError>({
            ...options,
            url: '/file/{key}'
        });
    }
    
}