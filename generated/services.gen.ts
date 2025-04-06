// This file is auto-generated by @hey-api/openapi-ts

import { createClient, createConfig, type Options } from '@hey-api/client-axios';
import type { GetHelloError, GetHelloResponse, EchoError, EchoResponse, CreateMessageError, CreateMessageResponse, ValidateMessageError, ValidateMessageResponse, RegisterData, RegisterError, RegisterResponse, GetOneUserData, GetOneUserError, GetOneUserResponse, UpdateOneUserData, UpdateOneUserError, UpdateOneUserResponse, ReplaceOneUserData, ReplaceOneUserError, ReplaceOneUserResponse, DeleteOneUserData, DeleteOneUserError, DeleteOneUserResponse, GetManyUserData, GetManyUserError, GetManyUserResponse, CreateOneUserData, CreateOneUserError, CreateOneUserResponse, CreateManyUserData, CreateManyUserError, CreateManyUserResponse, LoginData, LoginError, LoginResponse, GetProfileError, GetProfileResponse, CreateData, CreateError, CreateResponse, FindAllError, FindAllResponse, FindOneData, FindOneError, FindOneResponse, UpdateData, UpdateError, UpdateResponse, RemoveData, RemoveError, RemoveResponse, GetDictData, GetDictError, GetDictResponse, GetAllError, GetAllResponse, UploadFileError, UploadFileResponse, GetFileData, GetFileError, GetFileResponse, FindObjectsInBoundsData, FindObjectsInBoundsError, FindObjectsInBoundsResponse, FindGeoObjectsInAreaData, FindGeoObjectsInAreaError, FindGeoObjectsInAreaResponse, FindGeoObjectsByAnchorData, FindGeoObjectsByAnchorError, FindGeoObjectsByAnchorResponse, FindOneGeoObjectData, FindOneGeoObjectError, FindOneGeoObjectResponse, UpdateGeoObjectData, UpdateGeoObjectError, UpdateGeoObjectResponse, CreateGeoImageData, CreateGeoImageError, CreateGeoImageResponse, FindAllGeoImagesError, FindAllGeoImagesResponse, FindOneGeoImageData, FindOneGeoImageError, FindOneGeoImageResponse, DeleteGeoImageData, DeleteGeoImageError, DeleteGeoImageResponse, FindCloudAnchorObjectsInAreaData, FindCloudAnchorObjectsInAreaError, FindCloudAnchorObjectsInAreaResponse, CreateCloudAnchorData, CreateCloudAnchorError, CreateCloudAnchorResponse, FindAllAnchorsData, FindAllAnchorsError, FindAllAnchorsResponse, FindOneAnchorData, FindOneAnchorError, FindOneAnchorResponse, ListAnchorsData, ListAnchorsError, ListAnchorsResponse, GetAnchorData, GetAnchorError, GetAnchorResponse, DeleteAnchorData, DeleteAnchorError, DeleteAnchorResponse, UpdateAnchorExpireTimeData, UpdateAnchorExpireTimeError, UpdateAnchorExpireTimeResponse, CreateCommentData, CreateCommentError, CreateCommentResponse, FindAllCommentsData, FindAllCommentsError, FindAllCommentsResponse, FindOneCommentData, FindOneCommentError, FindOneCommentResponse, UpdateCommentData, UpdateCommentError, UpdateCommentResponse, DeleteCommentData, DeleteCommentError, DeleteCommentResponse, FindCommentsByCloudAnchorIdData, FindCommentsByCloudAnchorIdError, FindCommentsByCloudAnchorIdResponse, GetStatisticsByCloudAnchorIdData, GetStatisticsByCloudAnchorIdError, GetStatisticsByCloudAnchorIdResponse, CreateSceneData, CreateSceneError, CreateSceneResponse, FindAllScenesError, FindAllScenesResponse, FindUserScenesError, FindUserScenesResponse, FindOneSceneData, FindOneSceneError, FindOneSceneResponse, UpdateSceneData, UpdateSceneError, UpdateSceneResponse, RemoveSceneData, RemoveSceneError, RemoveSceneResponse, AddLabelData, AddLabelError, AddLabelResponse, RemoveLabelData, RemoveLabelError, RemoveLabelResponse, FindByLabelData, FindByLabelError, FindByLabelResponse, AddManagerData, AddManagerError, AddManagerResponse, RemoveManagerData, RemoveManagerError, RemoveManagerResponse, CreateLabelData, CreateLabelError, CreateLabelResponse, FindAllLabelsError, FindAllLabelsResponse, FindOneLabelData, FindOneLabelError, FindOneLabelResponse, UpdateLabelData, UpdateLabelError, UpdateLabelResponse, CreateWatermarkData, CreateWatermarkError, CreateWatermarkResponse, ExtractWatermarkData, ExtractWatermarkError, ExtractWatermarkResponse, GetStatisticsError, GetStatisticsResponse } from './types.gen';

export const client = createClient(createConfig());

export class DefaultService {
    public static getHello<ThrowOnError extends boolean = false>(options?: Options<unknown, ThrowOnError>) {
        return (options?.client ?? client).get<GetHelloResponse, GetHelloError, ThrowOnError>({
            ...options,
            url: '/api'
        });
    }
    
    public static echo<ThrowOnError extends boolean = false>(options?: Options<unknown, ThrowOnError>) {
        return (options?.client ?? client).post<EchoResponse, EchoError, ThrowOnError>({
            ...options,
            url: '/api'
        });
    }
    
    public static createMessage<ThrowOnError extends boolean = false>(options?: Options<unknown, ThrowOnError>) {
        return (options?.client ?? client).post<CreateMessageResponse, CreateMessageError, ThrowOnError>({
            ...options,
            url: '/api/consensus/create-message'
        });
    }
    
    /**
     * Is author has a valid message in the time range in the blockchain
     *
     * hashed message is stored in the blockchain
     *
     * == hash(message + author) in blockchain?
     */
    public static validateMessage<ThrowOnError extends boolean = false>(options?: Options<unknown, ThrowOnError>) {
        return (options?.client ?? client).post<ValidateMessageResponse, ValidateMessageError, ThrowOnError>({
            ...options,
            url: '/api/consensus/validate-message'
        });
    }
    
}

export class UserService {
    public static register<ThrowOnError extends boolean = false>(options: Options<RegisterData, ThrowOnError>) {
        return (options?.client ?? client).post<RegisterResponse, RegisterError, ThrowOnError>({
            ...options,
            url: '/api/user/register'
        });
    }
    
    /**
     * Retrieve a single User
     */
    public static getOneUser<ThrowOnError extends boolean = false>(options: Options<GetOneUserData, ThrowOnError>) {
        return (options?.client ?? client).get<GetOneUserResponse, GetOneUserError, ThrowOnError>({
            ...options,
            url: '/api/user/{id}'
        });
    }
    
    /**
     * Update a single User
     */
    public static updateOneUser<ThrowOnError extends boolean = false>(options: Options<UpdateOneUserData, ThrowOnError>) {
        return (options?.client ?? client).patch<UpdateOneUserResponse, UpdateOneUserError, ThrowOnError>({
            ...options,
            url: '/api/user/{id}'
        });
    }
    
    /**
     * Replace a single User
     */
    public static replaceOneUser<ThrowOnError extends boolean = false>(options: Options<ReplaceOneUserData, ThrowOnError>) {
        return (options?.client ?? client).put<ReplaceOneUserResponse, ReplaceOneUserError, ThrowOnError>({
            ...options,
            url: '/api/user/{id}'
        });
    }
    
    /**
     * Delete a single User
     */
    public static deleteOneUser<ThrowOnError extends boolean = false>(options: Options<DeleteOneUserData, ThrowOnError>) {
        return (options?.client ?? client).delete<DeleteOneUserResponse, DeleteOneUserError, ThrowOnError>({
            ...options,
            url: '/api/user/{id}'
        });
    }
    
    /**
     * Retrieve multiple Users
     */
    public static getManyUser<ThrowOnError extends boolean = false>(options?: Options<GetManyUserData, ThrowOnError>) {
        return (options?.client ?? client).get<GetManyUserResponse, GetManyUserError, ThrowOnError>({
            ...options,
            url: '/api/user'
        });
    }
    
    /**
     * Create a single User
     */
    public static createOneUser<ThrowOnError extends boolean = false>(options: Options<CreateOneUserData, ThrowOnError>) {
        return (options?.client ?? client).post<CreateOneUserResponse, CreateOneUserError, ThrowOnError>({
            ...options,
            url: '/api/user'
        });
    }
    
    /**
     * Create multiple Users
     */
    public static createManyUser<ThrowOnError extends boolean = false>(options: Options<CreateManyUserData, ThrowOnError>) {
        return (options?.client ?? client).post<CreateManyUserResponse, CreateManyUserError, ThrowOnError>({
            ...options,
            url: '/api/user/bulk'
        });
    }
    
}

export class AuthService {
    public static login<ThrowOnError extends boolean = false>(options: Options<LoginData, ThrowOnError>) {
        return (options?.client ?? client).post<LoginResponse, LoginError, ThrowOnError>({
            ...options,
            url: '/api/auth/auth/login'
        });
    }
    
    public static getProfile<ThrowOnError extends boolean = false>(options?: Options<unknown, ThrowOnError>) {
        return (options?.client ?? client).get<GetProfileResponse, GetProfileError, ThrowOnError>({
            ...options,
            url: '/api/auth/profile'
        });
    }
    
}

export class RoleService {
    public static create<ThrowOnError extends boolean = false>(options: Options<CreateData, ThrowOnError>) {
        return (options?.client ?? client).post<CreateResponse, CreateError, ThrowOnError>({
            ...options,
            url: '/api/role'
        });
    }
    
    public static findAll<ThrowOnError extends boolean = false>(options?: Options<unknown, ThrowOnError>) {
        return (options?.client ?? client).get<FindAllResponse, FindAllError, ThrowOnError>({
            ...options,
            url: '/api/role'
        });
    }
    
    public static findOne<ThrowOnError extends boolean = false>(options: Options<FindOneData, ThrowOnError>) {
        return (options?.client ?? client).get<FindOneResponse, FindOneError, ThrowOnError>({
            ...options,
            url: '/api/role/{id}'
        });
    }
    
    public static update<ThrowOnError extends boolean = false>(options: Options<UpdateData, ThrowOnError>) {
        return (options?.client ?? client).patch<UpdateResponse, UpdateError, ThrowOnError>({
            ...options,
            url: '/api/role/{id}'
        });
    }
    
    public static remove<ThrowOnError extends boolean = false>(options: Options<RemoveData, ThrowOnError>) {
        return (options?.client ?? client).delete<RemoveResponse, RemoveError, ThrowOnError>({
            ...options,
            url: '/api/role/{id}'
        });
    }
    
}

export class FceService {
    public static getDict<ThrowOnError extends boolean = false>(options: Options<GetDictData, ThrowOnError>) {
        return (options?.client ?? client).get<GetDictResponse, GetDictError, ThrowOnError>({
            ...options,
            url: '/api/faster-crud/dict/{entity}'
        });
    }
    
    public static getAll<ThrowOnError extends boolean = false>(options?: Options<unknown, ThrowOnError>) {
        return (options?.client ?? client).get<GetAllResponse, GetAllError, ThrowOnError>({
            ...options,
            url: '/api/faster-crud/all'
        });
    }
    
}

export class FileService {
    public static uploadFile<ThrowOnError extends boolean = false>(options?: Options<unknown, ThrowOnError>) {
        return (options?.client ?? client).post<UploadFileResponse, UploadFileError, ThrowOnError>({
            ...options,
            url: '/api/file/upload'
        });
    }
    
    public static getFile<ThrowOnError extends boolean = false>(options: Options<GetFileData, ThrowOnError>) {
        return (options?.client ?? client).get<GetFileResponse, GetFileError, ThrowOnError>({
            ...options,
            url: '/api/file/{key}'
        });
    }
    
}

export class GeoObjectService {
    /**
     * Find geo objects within specified bounds
     */
    public static findObjectsInBounds<ThrowOnError extends boolean = false>(options: Options<FindObjectsInBoundsData, ThrowOnError>) {
        return (options?.client ?? client).get<FindObjectsInBoundsResponse, FindObjectsInBoundsError, ThrowOnError>({
            ...options,
            url: '/api/geo-object/bounds'
        });
    }
    
    public static findGeoObjectsInArea<ThrowOnError extends boolean = false>(options: Options<FindGeoObjectsInAreaData, ThrowOnError>) {
        return (options?.client ?? client).get<FindGeoObjectsInAreaResponse, FindGeoObjectsInAreaError, ThrowOnError>({
            ...options,
            url: '/api/geo-object/range/{lat}/{lon}/{radius}'
        });
    }
    
    public static findGeoObjectsByAnchor<ThrowOnError extends boolean = false>(options: Options<FindGeoObjectsByAnchorData, ThrowOnError>) {
        return (options?.client ?? client).get<FindGeoObjectsByAnchorResponse, FindGeoObjectsByAnchorError, ThrowOnError>({
            ...options,
            url: '/api/geo-object/anchor/{anchorId}'
        });
    }
    
    public static findOneGeoObject<ThrowOnError extends boolean = false>(options: Options<FindOneGeoObjectData, ThrowOnError>) {
        return (options?.client ?? client).get<FindOneGeoObjectResponse, FindOneGeoObjectError, ThrowOnError>({
            ...options,
            url: '/api/geo-object/{id}'
        });
    }
    
    public static updateGeoObject<ThrowOnError extends boolean = false>(options: Options<UpdateGeoObjectData, ThrowOnError>) {
        return (options?.client ?? client).post<UpdateGeoObjectResponse, UpdateGeoObjectError, ThrowOnError>({
            ...options,
            url: '/api/geo-object'
        });
    }
    
}

export class GeoImageService {
    public static createGeoImage<ThrowOnError extends boolean = false>(options: Options<CreateGeoImageData, ThrowOnError>) {
        return (options?.client ?? client).post<CreateGeoImageResponse, CreateGeoImageError, ThrowOnError>({
            ...options,
            url: '/api/geo-image'
        });
    }
    
    public static findAllGeoImages<ThrowOnError extends boolean = false>(options?: Options<unknown, ThrowOnError>) {
        return (options?.client ?? client).get<FindAllGeoImagesResponse, FindAllGeoImagesError, ThrowOnError>({
            ...options,
            url: '/api/geo-image'
        });
    }
    
    public static findOneGeoImage<ThrowOnError extends boolean = false>(options: Options<FindOneGeoImageData, ThrowOnError>) {
        return (options?.client ?? client).get<FindOneGeoImageResponse, FindOneGeoImageError, ThrowOnError>({
            ...options,
            url: '/api/geo-image/{id}'
        });
    }
    
    public static deleteGeoImage<ThrowOnError extends boolean = false>(options: Options<DeleteGeoImageData, ThrowOnError>) {
        return (options?.client ?? client).delete<DeleteGeoImageResponse, DeleteGeoImageError, ThrowOnError>({
            ...options,
            url: '/api/geo-image/{id}'
        });
    }
    
}

export class CloudAnchorService {
    public static findCloudAnchorObjectsInArea<ThrowOnError extends boolean = false>(options: Options<FindCloudAnchorObjectsInAreaData, ThrowOnError>) {
        return (options?.client ?? client).get<FindCloudAnchorObjectsInAreaResponse, FindCloudAnchorObjectsInAreaError, ThrowOnError>({
            ...options,
            url: '/api/cloud-anchor/range/{lat}/{lon}/{radius}'
        });
    }
    
    public static createCloudAnchor<ThrowOnError extends boolean = false>(options: Options<CreateCloudAnchorData, ThrowOnError>) {
        return (options?.client ?? client).post<CreateCloudAnchorResponse, CreateCloudAnchorError, ThrowOnError>({
            ...options,
            url: '/api/cloud-anchor'
        });
    }
    
    public static findAllAnchors<ThrowOnError extends boolean = false>(options: Options<FindAllAnchorsData, ThrowOnError>) {
        return (options?.client ?? client).get<FindAllAnchorsResponse, FindAllAnchorsError, ThrowOnError>({
            ...options,
            url: '/api/cloud-anchor'
        });
    }
    
    public static findOneAnchor<ThrowOnError extends boolean = false>(options: Options<FindOneAnchorData, ThrowOnError>) {
        return (options?.client ?? client).get<FindOneAnchorResponse, FindOneAnchorError, ThrowOnError>({
            ...options,
            url: '/api/cloud-anchor/detail/{id}'
        });
    }
    
    public static listAnchors<ThrowOnError extends boolean = false>(options: Options<ListAnchorsData, ThrowOnError>) {
        return (options?.client ?? client).get<ListAnchorsResponse, ListAnchorsError, ThrowOnError>({
            ...options,
            url: '/api/cloud-anchor/list'
        });
    }
    
    public static getAnchor<ThrowOnError extends boolean = false>(options: Options<GetAnchorData, ThrowOnError>) {
        return (options?.client ?? client).get<GetAnchorResponse, GetAnchorError, ThrowOnError>({
            ...options,
            url: '/api/cloud-anchor/{anchorId}'
        });
    }
    
    public static deleteAnchor<ThrowOnError extends boolean = false>(options: Options<DeleteAnchorData, ThrowOnError>) {
        return (options?.client ?? client).delete<DeleteAnchorResponse, DeleteAnchorError, ThrowOnError>({
            ...options,
            url: '/api/cloud-anchor/{anchorId}'
        });
    }
    
    public static updateAnchorExpireTime<ThrowOnError extends boolean = false>(options: Options<UpdateAnchorExpireTimeData, ThrowOnError>) {
        return (options?.client ?? client).patch<UpdateAnchorExpireTimeResponse, UpdateAnchorExpireTimeError, ThrowOnError>({
            ...options,
            url: '/api/cloud-anchor/{anchorId}/expire-time'
        });
    }
    
}

export class GeoCommentService {
    /**
     * 创建地理评论
     */
    public static createComment<ThrowOnError extends boolean = false>(options: Options<CreateCommentData, ThrowOnError>) {
        return (options?.client ?? client).post<CreateCommentResponse, CreateCommentError, ThrowOnError>({
            ...options,
            url: '/api/geo-comment'
        });
    }
    
    /**
     * 分页查询评论列表
     */
    public static findAllComments<ThrowOnError extends boolean = false>(options?: Options<FindAllCommentsData, ThrowOnError>) {
        return (options?.client ?? client).get<FindAllCommentsResponse, FindAllCommentsError, ThrowOnError>({
            ...options,
            url: '/api/geo-comment'
        });
    }
    
    /**
     * 获取单个评论
     */
    public static findOneComment<ThrowOnError extends boolean = false>(options: Options<FindOneCommentData, ThrowOnError>) {
        return (options?.client ?? client).get<FindOneCommentResponse, FindOneCommentError, ThrowOnError>({
            ...options,
            url: '/api/geo-comment/{id}'
        });
    }
    
    /**
     * 更新评论
     */
    public static updateComment<ThrowOnError extends boolean = false>(options: Options<UpdateCommentData, ThrowOnError>) {
        return (options?.client ?? client).patch<UpdateCommentResponse, UpdateCommentError, ThrowOnError>({
            ...options,
            url: '/api/geo-comment/{id}'
        });
    }
    
    /**
     * 删除评论
     */
    public static deleteComment<ThrowOnError extends boolean = false>(options: Options<DeleteCommentData, ThrowOnError>) {
        return (options?.client ?? client).delete<DeleteCommentResponse, DeleteCommentError, ThrowOnError>({
            ...options,
            url: '/api/geo-comment/{id}'
        });
    }
    
    /**
     * 按云锚点ID查询评论
     */
    public static findCommentsByCloudAnchorId<ThrowOnError extends boolean = false>(options: Options<FindCommentsByCloudAnchorIdData, ThrowOnError>) {
        return (options?.client ?? client).get<FindCommentsByCloudAnchorIdResponse, FindCommentsByCloudAnchorIdError, ThrowOnError>({
            ...options,
            url: '/api/geo-comment/cloud-anchor/{cloudAnchorId}'
        });
    }
    
    /**
     * 获取评论统计信息
     */
    public static getStatisticsByCloudAnchorId<ThrowOnError extends boolean = false>(options: Options<GetStatisticsByCloudAnchorIdData, ThrowOnError>) {
        return (options?.client ?? client).get<GetStatisticsByCloudAnchorIdResponse, GetStatisticsByCloudAnchorIdError, ThrowOnError>({
            ...options,
            url: '/api/geo-comment/cloud-anchor/{cloudAnchorId}/statistics'
        });
    }
    
}

export class SceneService {
    /**
     * 创建新场景
     */
    public static createScene<ThrowOnError extends boolean = false>(options: Options<CreateSceneData, ThrowOnError>) {
        return (options?.client ?? client).post<CreateSceneResponse, CreateSceneError, ThrowOnError>({
            ...options,
            url: '/api/scene'
        });
    }
    
    /**
     * 获取所有场景
     */
    public static findAllScenes<ThrowOnError extends boolean = false>(options?: Options<unknown, ThrowOnError>) {
        return (options?.client ?? client).get<FindAllScenesResponse, FindAllScenesError, ThrowOnError>({
            ...options,
            url: '/api/scene'
        });
    }
    
    /**
     * 获取用户相关的场景
     */
    public static findUserScenes<ThrowOnError extends boolean = false>(options?: Options<unknown, ThrowOnError>) {
        return (options?.client ?? client).get<FindUserScenesResponse, FindUserScenesError, ThrowOnError>({
            ...options,
            url: '/api/scene/my-scenes'
        });
    }
    
    /**
     * 根据ID获取场景
     */
    public static findOneScene<ThrowOnError extends boolean = false>(options: Options<FindOneSceneData, ThrowOnError>) {
        return (options?.client ?? client).get<FindOneSceneResponse, FindOneSceneError, ThrowOnError>({
            ...options,
            url: '/api/scene/{id}'
        });
    }
    
    /**
     * 更新场景
     */
    public static updateScene<ThrowOnError extends boolean = false>(options: Options<UpdateSceneData, ThrowOnError>) {
        return (options?.client ?? client).patch<UpdateSceneResponse, UpdateSceneError, ThrowOnError>({
            ...options,
            url: '/api/scene/{id}'
        });
    }
    
    /**
     * 删除场景
     */
    public static removeScene<ThrowOnError extends boolean = false>(options: Options<RemoveSceneData, ThrowOnError>) {
        return (options?.client ?? client).delete<RemoveSceneResponse, RemoveSceneError, ThrowOnError>({
            ...options,
            url: '/api/scene/{id}'
        });
    }
    
    /**
     * 为场景添加标签
     */
    public static addLabel<ThrowOnError extends boolean = false>(options: Options<AddLabelData, ThrowOnError>) {
        return (options?.client ?? client).post<AddLabelResponse, AddLabelError, ThrowOnError>({
            ...options,
            url: '/api/scene/{id}/labels/{labelId}'
        });
    }
    
    /**
     * 从场景移除标签
     */
    public static removeLabel<ThrowOnError extends boolean = false>(options: Options<RemoveLabelData, ThrowOnError>) {
        return (options?.client ?? client).delete<RemoveLabelResponse, RemoveLabelError, ThrowOnError>({
            ...options,
            url: '/api/scene/{id}/labels/{labelId}'
        });
    }
    
    /**
     * 根据标签查询场景
     */
    public static findByLabel<ThrowOnError extends boolean = false>(options: Options<FindByLabelData, ThrowOnError>) {
        return (options?.client ?? client).get<FindByLabelResponse, FindByLabelError, ThrowOnError>({
            ...options,
            url: '/api/scene/by-label/{labelId}'
        });
    }
    
    /**
     * 添加场景管理员
     */
    public static addManager<ThrowOnError extends boolean = false>(options: Options<AddManagerData, ThrowOnError>) {
        return (options?.client ?? client).post<AddManagerResponse, AddManagerError, ThrowOnError>({
            ...options,
            url: '/api/scene/{id}/managers/{managerId}'
        });
    }
    
    /**
     * 移除场景管理员
     */
    public static removeManager<ThrowOnError extends boolean = false>(options: Options<RemoveManagerData, ThrowOnError>) {
        return (options?.client ?? client).delete<RemoveManagerResponse, RemoveManagerError, ThrowOnError>({
            ...options,
            url: '/api/scene/{id}/managers/{managerId}'
        });
    }
    
}

export class LabelService {
    /**
     * 创建新标签
     */
    public static createLabel<ThrowOnError extends boolean = false>(options: Options<CreateLabelData, ThrowOnError>) {
        return (options?.client ?? client).post<CreateLabelResponse, CreateLabelError, ThrowOnError>({
            ...options,
            url: '/api/label'
        });
    }
    
    /**
     * 获取所有标签
     */
    public static findAllLabels<ThrowOnError extends boolean = false>(options?: Options<unknown, ThrowOnError>) {
        return (options?.client ?? client).get<FindAllLabelsResponse, FindAllLabelsError, ThrowOnError>({
            ...options,
            url: '/api/label'
        });
    }
    
    /**
     * 根据ID获取标签
     */
    public static findOneLabel<ThrowOnError extends boolean = false>(options: Options<FindOneLabelData, ThrowOnError>) {
        return (options?.client ?? client).get<FindOneLabelResponse, FindOneLabelError, ThrowOnError>({
            ...options,
            url: '/api/label/{id}'
        });
    }
    
    /**
     * 更新标签
     */
    public static updateLabel<ThrowOnError extends boolean = false>(options: Options<UpdateLabelData, ThrowOnError>) {
        return (options?.client ?? client).patch<UpdateLabelResponse, UpdateLabelError, ThrowOnError>({
            ...options,
            url: '/api/label/{id}'
        });
    }
    
    /**
     * 删除标签
     */
    public static removeLabel<ThrowOnError extends boolean = false>(options: Options<RemoveLabelData, ThrowOnError>) {
        return (options?.client ?? client).delete<RemoveLabelResponse, RemoveLabelError, ThrowOnError>({
            ...options,
            url: '/api/label/{id}'
        });
    }
    
}

export class WatermarkService {
    public static createWatermark<ThrowOnError extends boolean = false>(options: Options<CreateWatermarkData, ThrowOnError>) {
        return (options?.client ?? client).post<CreateWatermarkResponse, CreateWatermarkError, ThrowOnError>({
            ...options,
            url: '/api/watermark/create'
        });
    }
    
    public static extractWatermark<ThrowOnError extends boolean = false>(options: Options<ExtractWatermarkData, ThrowOnError>) {
        return (options?.client ?? client).post<ExtractWatermarkResponse, ExtractWatermarkError, ThrowOnError>({
            ...options,
            url: '/api/watermark/extract'
        });
    }
    
}

export class StatisticsService {
    /**
     * 获取系统统计数据
     */
    public static getStatistics<ThrowOnError extends boolean = false>(options?: Options<unknown, ThrowOnError>) {
        return (options?.client ?? client).get<GetStatisticsResponse, GetStatisticsError, ThrowOnError>({
            ...options,
            url: '/api/statistics'
        });
    }
    
}