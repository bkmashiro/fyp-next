// This file is auto-generated by @hey-api/openapi-ts

export type CreateUserDto = {
    username: string;
    password: string;
};

export type GetManyUserResponseDto = {
    data: Array<User>;
    count: number;
    total: number;
    page: number;
    pageCount: number;
};

export type Role = {
    id: number;
    name: string;
    user: User;
};

export type File = {
    key: string;
    originalName: string;
    size: number;
    mimeType: string;
    user: User;
    deletedAt: string;
};

export type User = {
    id: number;
    username: string;
    password: string;
    roles: Array<Role>;
    files: Array<File>;
};

export type CreateManyUserDto = {
    bulk: Array<User>;
};

export type PasswordLoginDto = {
    username: string;
    password: string;
};

export type CreateRoleDto = {
    [key: string]: unknown;
};

export type UpdateRoleDto = {
    [key: string]: unknown;
};

export type RegisterImageCopyrightDto = {
    /**
     * GeoImage ID
     */
    geoImageId: string;
    /**
     * User ID
     */
    userId: string;
};

export type VerifyImageCopyrightDto = {
    /**
     * Image feature vector (hash)
     */
    imageHash: string;
    /**
     * User ID to verify against
     */
    userId: string;
    /**
     * Start time of the verification period
     */
    from?: string;
    /**
     * End time of the verification period
     */
    to?: string;
};

export type CreateGeoImageDto = {
    ossFileId: string;
    position: {
        [key: string]: unknown;
    };
    altitude: number;
    orientation: Array<(number)>;
    scale?: Array<(number)>;
    cloudAnchorId: string;
    metadata?: string;
};

export type Label = {
    id: string;
    name: string;
    description: string;
    scenes: Array<Scene>;
};

export type Scene = {
    name: string;
    description: string;
    children: Array<GeoObject>;
    labels: Array<Label>;
    creator: User;
    managers: Array<User>;
};

export type GeoObject = {
    type: string;
    anchor: {
        [key: string]: unknown;
    };
    anchor_latitude: number;
    metadata: (string) | null;
    cloudAnchor: CloudAnchor;
    relPosition: {
        [key: string]: unknown;
    };
    relAltitude: number;
    relOrientation: Array<(number)>;
    createdAt: string;
    updatedAt: string;
    scene: Scene;
};

export type CloudAnchor = {
    id: number;
    cloudAnchorId: string;
    anchor: {
        [key: string]: unknown;
    };
    altitude: number;
    geoObjects: Array<GeoObject>;
};

export type GeoImage = {
    ossFile: File;
    type: string;
    anchor: {
        [key: string]: unknown;
    };
    anchor_latitude: number;
    metadata: (string) | null;
    cloudAnchor: CloudAnchor;
    relPosition: {
        [key: string]: unknown;
    };
    relAltitude: number;
    relOrientation: Array<(number)>;
    createdAt: string;
    updatedAt: string;
    scene: Scene;
};

export type CreateCloudAnchorDto = {
    cloudAnchorId: string;
    position: Array<(number)>;
    altitude: number;
};

export type UpdateGeoObjectDto = {
    id: string;
    data: {
        [key: string]: unknown;
    };
};

export type CreateGeoCommentDto = {
    position: {
        [key: string]: unknown;
    };
    altitude: number;
    orientation: Array<(number)>;
    scale?: Array<(number)>;
    cloudAnchorId: string;
    metadata?: string;
};

export type GeoComment = {
    type: string;
    anchor: {
        [key: string]: unknown;
    };
    anchor_latitude: number;
    metadata: (string) | null;
    cloudAnchor: CloudAnchor;
    relPosition: {
        [key: string]: unknown;
    };
    relAltitude: number;
    relOrientation: Array<(number)>;
    createdAt: string;
    updatedAt: string;
    scene: Scene;
    text: string;
};

export type UpdateGeoCommentDto = {
    position?: {
        [key: string]: unknown;
    };
    altitude?: number;
    orientation?: Array<(number)>;
    scale?: Array<(number)>;
    cloudAnchorId?: string;
    metadata?: string;
};

export type CreateSceneDto = {
    name: string;
    description?: string;
    position: Array<(string)>;
    altitude?: number;
    orientation?: Array<(string)>;
    scale?: Array<(string)>;
    managerIds?: Array<(number)>;
};

export type UpdateSceneDto = {
    name?: string;
    description?: string;
    position?: Array<(string)>;
    altitude?: number;
    orientation?: Array<(string)>;
    scale?: Array<(string)>;
    managerIds?: Array<(number)>;
};

export type CreateLabelDto = {
    /**
     * 标签名称
     */
    name: string;
    /**
     * 标签描述
     */
    description?: string;
};

export type UpdateLabelDto = {
    /**
     * 标签名称
     */
    name?: string;
    /**
     * 标签描述
     */
    description?: string;
};

export type CreateWatermarkDto = {
    fileKey: string;
    watermark: string;
    length?: number;
};

export type ExtractWatermarkDto = {
    fileKey: string;
    passwordImg: number;
    passwordWm: number;
    watermarkLength: number;
};

export type GetHelloResponse = (string);

export type GetHelloError = unknown;

export type EchoResponse = (string);

export type EchoError = unknown;

export type RegisterData = {
    body: CreateUserDto;
};

export type RegisterResponse = (User);

export type RegisterError = unknown;

export type GetOneUserData = {
    path: {
        id: number;
    };
    query?: {
        /**
         * Reset cache (if was enabled). <a href="https://github.com/nestjsx/crud/wiki/Requests#cache" target="_blank">Docs</a>
         */
        cache?: number;
        /**
         * Selects resource fields. <a href="https://github.com/nestjsx/crud/wiki/Requests#select" target="_blank">Docs</a>
         */
        fields?: Array<(string)>;
        /**
         * Adds relational resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#join" target="_blank">Docs</a>
         */
        join?: Array<(string)>;
    };
};

export type GetOneUserResponse = (User);

export type GetOneUserError = unknown;

export type UpdateOneUserData = {
    body: User;
    path: {
        id: number;
    };
};

export type UpdateOneUserResponse = (User);

export type UpdateOneUserError = unknown;

export type ReplaceOneUserData = {
    body: User;
    path: {
        id: number;
    };
};

export type ReplaceOneUserResponse = (User);

export type ReplaceOneUserError = unknown;

export type DeleteOneUserData = {
    path: {
        id: number;
    };
};

export type DeleteOneUserResponse = (unknown);

export type DeleteOneUserError = unknown;

export type GetManyUserData = {
    query?: {
        /**
         * Reset cache (if was enabled). <a href="https://github.com/nestjsx/crud/wiki/Requests#cache" target="_blank">Docs</a>
         */
        cache?: number;
        /**
         * Selects resource fields. <a href="https://github.com/nestjsx/crud/wiki/Requests#select" target="_blank">Docs</a>
         */
        fields?: Array<(string)>;
        /**
         * Adds filter condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#filter" target="_blank">Docs</a>
         */
        filter?: Array<(string)>;
        /**
         * Adds relational resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#join" target="_blank">Docs</a>
         */
        join?: Array<(string)>;
        /**
         * Limit amount of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#limit" target="_blank">Docs</a>
         */
        limit?: number;
        /**
         * Offset amount of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#offset" target="_blank">Docs</a>
         */
        offset?: number;
        /**
         * Adds OR condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#or" target="_blank">Docs</a>
         */
        or?: Array<(string)>;
        /**
         * Page portion of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#page" target="_blank">Docs</a>
         */
        page?: number;
        /**
         * Adds search condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#search" target="_blank">Docs</a>
         */
        s?: string;
        /**
         * Adds sort by field. <a href="https://github.com/nestjsx/crud/wiki/Requests#sort" target="_blank">Docs</a>
         */
        sort?: Array<(string)>;
    };
};

export type GetManyUserResponse = ((GetManyUserResponseDto | Array<User>));

export type GetManyUserError = unknown;

export type CreateOneUserData = {
    body: User;
};

export type CreateOneUserResponse = (User);

export type CreateOneUserError = unknown;

export type CreateManyUserData = {
    body: CreateManyUserDto;
};

export type CreateManyUserResponse = (Array<User>);

export type CreateManyUserError = unknown;

export type LoginData = {
    body: PasswordLoginDto;
};

export type LoginResponse = (unknown);

export type LoginError = unknown;

export type GetProfileResponse = ({
    [key: string]: unknown;
});

export type GetProfileError = unknown;

export type CreateData = {
    body: CreateRoleDto;
};

export type CreateResponse = (string);

export type CreateError = unknown;

export type FindAllResponse = (string);

export type FindAllError = unknown;

export type FindOneData = {
    path: {
        id: string;
    };
};

export type FindOneResponse = (string);

export type FindOneError = unknown;

export type UpdateData = {
    body: UpdateRoleDto;
    path: {
        id: string;
    };
};

export type UpdateResponse = (string);

export type UpdateError = unknown;

export type RemoveData = {
    path: {
        id: string;
    };
};

export type RemoveResponse = (string);

export type RemoveError = unknown;

export type GetDictData = {
    path: {
        entity: string;
    };
};

export type GetDictResponse = ({
    [key: string]: unknown;
});

export type GetDictError = unknown;

export type GetAllResponse = (Array<(string)>);

export type GetAllError = unknown;

export type UploadFileResponse = (unknown);

export type UploadFileError = unknown;

export type GetFileData = {
    path: {
        key: string;
    };
};

export type GetFileResponse = (unknown);

export type GetFileError = unknown;

export type CreateMessageResponse = (unknown);

export type CreateMessageError = unknown;

export type ValidateMessageResponse = (boolean);

export type ValidateMessageError = unknown;

export type RegisterImageCopyrightData = {
    body: RegisterImageCopyrightDto;
};

export type RegisterImageCopyrightResponse = ({
    [key: string]: unknown;
});

export type RegisterImageCopyrightError = unknown;

export type VerifyImageCopyrightData = {
    body: VerifyImageCopyrightDto;
};

export type VerifyImageCopyrightResponse = (unknown);

export type VerifyImageCopyrightError = unknown;

export type GetCopyrightInfoData = {
    path: {
        /**
         * GeoImage ID
         */
        geoImageId: string;
    };
};

export type GetCopyrightInfoResponse = ({
    [key: string]: unknown;
});

export type GetCopyrightInfoError = unknown;

export type CalculateImageHashResponse = ({
    [key: string]: unknown;
});

export type CalculateImageHashError = unknown;

export type FindGeoImagesByMessagePrefixData = {
    path: {
        /**
         * Message prefix to search for
         */
        prefix: string;
    };
};

export type FindGeoImagesByMessagePrefixResponse = (unknown);

export type FindGeoImagesByMessagePrefixError = unknown;

export type CreateGeoImageData = {
    body: CreateGeoImageDto;
};

export type CreateGeoImageResponse = (GeoImage);

export type CreateGeoImageError = unknown;

export type FindAllGeoImagesResponse = (unknown);

export type FindAllGeoImagesError = unknown;

export type FindOneGeoImageData = {
    path: {
        id: string;
    };
};

export type FindOneGeoImageResponse = (GeoImage);

export type FindOneGeoImageError = unknown;

export type DeleteGeoImageData = {
    path: {
        id: string;
    };
};

export type DeleteGeoImageResponse = (GeoImage);

export type DeleteGeoImageError = unknown;

export type FindCloudAnchorObjectsInAreaData = {
    path: {
        lat: string;
        lon: string;
        radius: string;
    };
};

export type FindCloudAnchorObjectsInAreaResponse = (Array<CloudAnchor>);

export type FindCloudAnchorObjectsInAreaError = unknown;

export type CreateCloudAnchorData = {
    body: CreateCloudAnchorDto;
};

export type CreateCloudAnchorResponse = (CloudAnchor);

export type CreateCloudAnchorError = unknown;

export type FindAllAnchorsData = {
    query: {
        page: string;
        pageSize: string;
    };
};

export type FindAllAnchorsResponse = (unknown);

export type FindAllAnchorsError = unknown;

export type FindOneAnchorData = {
    path: {
        id: string;
    };
};

export type FindOneAnchorResponse = (CloudAnchor);

export type FindOneAnchorError = unknown;

export type ListAnchorsData = {
    query: {
        nextPageToken: string;
        pageSize: string;
    };
};

export type ListAnchorsResponse = ({
    [key: string]: unknown;
});

export type ListAnchorsError = unknown;

export type GetAnchorData = {
    path: {
        anchorId: string;
    };
};

export type GetAnchorResponse = ({
    [key: string]: unknown;
});

export type GetAnchorError = unknown;

export type DeleteAnchorData = {
    path: {
        anchorId: string;
    };
};

export type DeleteAnchorResponse = (unknown);

export type DeleteAnchorError = unknown;

export type UpdateAnchorExpireTimeData = {
    path: {
        anchorId: string;
    };
};

export type UpdateAnchorExpireTimeResponse = ({
    [key: string]: unknown;
});

export type UpdateAnchorExpireTimeError = unknown;

export type FindObjectsInBoundsData = {
    query: {
        limit?: number;
        limit?: number;
        maxLat: number;
        maxLat: number;
        maxLon: number;
        maxLon: number;
        minLat: number;
        minLat: number;
        minLon: number;
        minLon: number;
        page?: number;
        page?: number;
        type?: string;
        type?: string;
    };
};

export type FindObjectsInBoundsResponse = (unknown);

export type FindObjectsInBoundsError = unknown;

export type FindGeoObjectsInAreaData = {
    path: {
        lat: string;
        lon: string;
        radius: string;
    };
};

export type FindGeoObjectsInAreaResponse = (Array<GeoObject>);

export type FindGeoObjectsInAreaError = unknown;

export type FindGeoObjectsByAnchorData = {
    path: {
        anchorId: string;
    };
};

export type FindGeoObjectsByAnchorResponse = (Array<GeoObject>);

export type FindGeoObjectsByAnchorError = unknown;

export type FindOneGeoObjectData = {
    path: {
        id: string;
    };
};

export type FindOneGeoObjectResponse = (GeoObject);

export type FindOneGeoObjectError = unknown;

export type UpdateGeoObjectData = {
    body: UpdateGeoObjectDto;
};

export type UpdateGeoObjectResponse = (GeoObject);

export type UpdateGeoObjectError = unknown;

export type CreateCommentData = {
    body: CreateGeoCommentDto;
};

export type CreateCommentResponse = (GeoComment);

export type CreateCommentError = unknown;

export type FindAllCommentsData = {
    query?: {
        limit?: number;
        limit?: number;
        page?: number;
        page?: number;
    };
};

export type FindAllCommentsResponse = (unknown);

export type FindAllCommentsError = unknown;

export type FindOneCommentData = {
    path: {
        id: string;
    };
};

export type FindOneCommentResponse = (GeoComment);

export type FindOneCommentError = unknown;

export type UpdateCommentData = {
    body: UpdateGeoCommentDto;
    path: {
        id: string;
    };
};

export type UpdateCommentResponse = (GeoComment);

export type UpdateCommentError = unknown;

export type DeleteCommentData = {
    path: {
        id: string;
    };
};

export type DeleteCommentResponse = (GeoComment);

export type DeleteCommentError = unknown;

export type FindCommentsByCloudAnchorIdData = {
    path: {
        cloudAnchorId: number;
    };
    query?: {
        limit?: number;
        limit?: number;
        page?: number;
        page?: number;
    };
};

export type FindCommentsByCloudAnchorIdResponse = (unknown);

export type FindCommentsByCloudAnchorIdError = unknown;

export type GetStatisticsByCloudAnchorIdData = {
    path: {
        cloudAnchorId: number;
    };
};

export type GetStatisticsByCloudAnchorIdResponse = (unknown);

export type GetStatisticsByCloudAnchorIdError = unknown;

export type CreateSceneData = {
    body: CreateSceneDto;
};

export type CreateSceneResponse = (Scene);

export type CreateSceneError = unknown;

export type FindAllScenesResponse = (Array<Scene>);

export type FindAllScenesError = unknown;

export type FindUserScenesResponse = (Array<Scene>);

export type FindUserScenesError = unknown;

export type FindOneSceneData = {
    path: {
        id: string;
    };
};

export type FindOneSceneResponse = (Scene);

export type FindOneSceneError = unknown;

export type UpdateSceneData = {
    body: UpdateSceneDto;
    path: {
        id: string;
    };
};

export type UpdateSceneResponse = (Scene);

export type UpdateSceneError = unknown;

export type RemoveSceneData = {
    path: {
        id: string;
    };
};

export type RemoveSceneResponse = (Scene);

export type RemoveSceneError = unknown;

export type AddLabelData = {
    path: {
        id: string;
        labelId: string;
    };
};

export type AddLabelResponse = (Scene);

export type AddLabelError = unknown;

export type RemoveLabelData = {
    path: {
        id: string;
        labelId: string;
    };
};

export type RemoveLabelResponse = (Scene);

export type RemoveLabelError = unknown;

export type FindByLabelData = {
    path: {
        labelId: string;
    };
};

export type FindByLabelResponse = (Array<Scene>);

export type FindByLabelError = unknown;

export type AddManagerData = {
    path: {
        id: string;
        managerId: string;
    };
};

export type AddManagerResponse = (Scene);

export type AddManagerError = unknown;

export type RemoveManagerData = {
    path: {
        id: string;
        managerId: string;
    };
};

export type RemoveManagerResponse = (Scene);

export type RemoveManagerError = unknown;

export type CreateLabelData = {
    body: CreateLabelDto;
};

export type CreateLabelResponse = (Label);

export type CreateLabelError = unknown;

export type FindAllLabelsResponse = (Array<Label>);

export type FindAllLabelsError = unknown;

export type FindOneLabelData = {
    path: {
        id: string;
    };
};

export type FindOneLabelResponse = (Label);

export type FindOneLabelError = unknown;

export type UpdateLabelData = {
    body: UpdateLabelDto;
    path: {
        id: string;
    };
};

export type UpdateLabelResponse = (Label);

export type UpdateLabelError = unknown;

export type CreateWatermarkData = {
    body: CreateWatermarkDto;
};

export type CreateWatermarkResponse = (unknown);

export type CreateWatermarkError = unknown;

export type ExtractWatermarkData = {
    body: ExtractWatermarkDto;
};

export type ExtractWatermarkResponse = (unknown);

export type ExtractWatermarkError = unknown;

export type GetStatisticsResponse = ({
    /**
     * Cloud Anchors 总数
     */
    cloudAnchorsCount?: number;
    /**
     * Geo Images 总数
     */
    geoImagesCount?: number;
    /**
     * Geo Comments 总数
     */
    geoCommentsCount?: number;
});

export type GetStatisticsError = unknown;