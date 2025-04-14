// This file is auto-generated by @hey-api/openapi-ts

export const $CreateUserDto = {
    type: 'object',
    properties: {
        username: {
            type: 'string',
            minLength: 1,
            maxLength: 20
        },
        password: {
            type: 'string',
            minLength: 1,
            maxLength: 32
        }
    },
    required: ['username', 'password']
} as const;

export const $GetManyUserResponseDto = {
    type: 'object',
    properties: {
        data: {
            type: 'array',
            items: {
                '$ref': '#/components/schemas/User'
            }
        },
        count: {
            type: 'number'
        },
        total: {
            type: 'number'
        },
        page: {
            type: 'number'
        },
        pageCount: {
            type: 'number'
        }
    },
    required: ['data', 'count', 'total', 'page', 'pageCount']
} as const;

export const $Role = {
    type: 'object',
    properties: {
        id: {
            type: 'number'
        },
        name: {
            type: 'string'
        },
        user: {
            '$ref': '#/components/schemas/User'
        }
    },
    required: ['id', 'name', 'user']
} as const;

export const $File = {
    type: 'object',
    properties: {
        key: {
            type: 'string'
        },
        originalName: {
            type: 'string'
        },
        size: {
            type: 'number'
        },
        mimeType: {
            type: 'string'
        },
        user: {
            '$ref': '#/components/schemas/User'
        },
        deletedAt: {
            format: 'date-time',
            type: 'string'
        }
    },
    required: ['key', 'originalName', 'size', 'mimeType', 'user', 'deletedAt']
} as const;

export const $User = {
    type: 'object',
    properties: {
        id: {
            type: 'number'
        },
        username: {
            type: 'string'
        },
        password: {
            type: 'string'
        },
        roles: {
            type: 'array',
            items: {
                '$ref': '#/components/schemas/Role'
            }
        },
        files: {
            type: 'array',
            items: {
                '$ref': '#/components/schemas/File'
            }
        }
    },
    required: ['id', 'username', 'password', 'roles', 'files']
} as const;

export const $CreateManyUserDto = {
    type: 'object',
    properties: {
        bulk: {
            type: 'array',
            items: {
                '$ref': '#/components/schemas/User'
            }
        }
    },
    required: ['bulk']
} as const;

export const $PasswordLoginDto = {
    type: 'object',
    properties: {
        username: {
            type: 'string',
            minLength: 1,
            maxLength: 20
        },
        password: {
            type: 'string',
            minLength: 1,
            maxLength: 32
        }
    },
    required: ['username', 'password']
} as const;

export const $CreateRoleDto = {
    type: 'object',
    properties: {}
} as const;

export const $UpdateRoleDto = {
    type: 'object',
    properties: {}
} as const;

export const $RegisterImageCopyrightDto = {
    type: 'object',
    properties: {
        geoImageId: {
            type: 'string',
            description: 'GeoImage ID',
            example: '123e4567-e89b-12d3-a456-426614174000'
        },
        userId: {
            type: 'string',
            description: 'User ID',
            example: 'user123'
        }
    },
    required: ['geoImageId', 'userId']
} as const;

export const $VerifyImageCopyrightDto = {
    type: 'object',
    properties: {
        imageHash: {
            type: 'string',
            description: 'Image feature vector (hash)',
            example: 'a1b2c3d4e5f6g7h8i9j0'
        },
        userId: {
            type: 'string',
            description: 'User ID to verify against',
            example: 'user123456'
        },
        from: {
            format: 'date-time',
            type: 'string',
            description: 'Start time of the verification period',
            example: '2024-01-01T00:00:00Z'
        },
        to: {
            format: 'date-time',
            type: 'string',
            description: 'End time of the verification period',
            example: '2024-12-31T23:59:59Z'
        }
    },
    required: ['imageHash', 'userId']
} as const;

export const $CreateGeoImageDto = {
    type: 'object',
    properties: {
        ossFileId: {
            type: 'string'
        },
        position: {
            type: 'object'
        },
        altitude: {
            type: 'number'
        },
        orientation: {
            type: 'array',
            items: {
                type: 'number'
            }
        },
        scale: {
            type: 'array',
            items: {
                type: 'number'
            }
        },
        cloudAnchorId: {
            type: 'string'
        },
        metadata: {
            type: 'string'
        }
    },
    required: ['ossFileId', 'position', 'altitude', 'orientation', 'cloudAnchorId']
} as const;

export const $Label = {
    type: 'object',
    properties: {
        id: {
            type: 'string'
        },
        name: {
            type: 'string'
        },
        description: {
            type: 'string'
        },
        scenes: {
            type: 'array',
            items: {
                '$ref': '#/components/schemas/Scene'
            }
        }
    },
    required: ['id', 'name', 'description', 'scenes']
} as const;

export const $Scene = {
    type: 'object',
    properties: {
        name: {
            type: 'string'
        },
        description: {
            type: 'string'
        },
        children: {
            type: 'array',
            items: {
                '$ref': '#/components/schemas/GeoObject'
            }
        },
        labels: {
            type: 'array',
            items: {
                '$ref': '#/components/schemas/Label'
            }
        },
        creator: {
            '$ref': '#/components/schemas/User'
        },
        managers: {
            type: 'array',
            items: {
                '$ref': '#/components/schemas/User'
            }
        }
    },
    required: ['name', 'description', 'children', 'labels', 'creator', 'managers']
} as const;

export const $GeoObject = {
    type: 'object',
    properties: {
        type: {
            type: 'string'
        },
        anchor: {
            type: 'object'
        },
        anchor_latitude: {
            type: 'number'
        },
        metadata: {
            type: 'string',
            nullable: true
        },
        cloudAnchor: {
            '$ref': '#/components/schemas/CloudAnchor'
        },
        relPosition: {
            type: 'object'
        },
        relAltitude: {
            type: 'number'
        },
        relOrientation: {
            type: 'array',
            items: {
                type: 'number'
            }
        },
        createdAt: {
            format: 'date-time',
            type: 'string'
        },
        updatedAt: {
            format: 'date-time',
            type: 'string'
        },
        scene: {
            '$ref': '#/components/schemas/Scene'
        }
    },
    required: ['type', 'anchor', 'anchor_latitude', 'metadata', 'cloudAnchor', 'relPosition', 'relAltitude', 'relOrientation', 'createdAt', 'updatedAt', 'scene']
} as const;

export const $CloudAnchor = {
    type: 'object',
    properties: {
        id: {
            type: 'number'
        },
        cloudAnchorId: {
            type: 'string'
        },
        anchor: {
            type: 'object'
        },
        altitude: {
            type: 'number'
        },
        geoObjects: {
            type: 'array',
            items: {
                '$ref': '#/components/schemas/GeoObject'
            }
        }
    },
    required: ['id', 'cloudAnchorId', 'anchor', 'altitude', 'geoObjects']
} as const;

export const $GeoImage = {
    type: 'object',
    properties: {
        ossFile: {
            '$ref': '#/components/schemas/File'
        },
        type: {
            type: 'string'
        },
        anchor: {
            type: 'object'
        },
        anchor_latitude: {
            type: 'number'
        },
        metadata: {
            type: 'string',
            nullable: true
        },
        cloudAnchor: {
            '$ref': '#/components/schemas/CloudAnchor'
        },
        relPosition: {
            type: 'object'
        },
        relAltitude: {
            type: 'number'
        },
        relOrientation: {
            type: 'array',
            items: {
                type: 'number'
            }
        },
        createdAt: {
            format: 'date-time',
            type: 'string'
        },
        updatedAt: {
            format: 'date-time',
            type: 'string'
        },
        scene: {
            '$ref': '#/components/schemas/Scene'
        }
    },
    required: ['ossFile', 'type', 'anchor', 'anchor_latitude', 'metadata', 'cloudAnchor', 'relPosition', 'relAltitude', 'relOrientation', 'createdAt', 'updatedAt', 'scene']
} as const;

export const $CreateCloudAnchorDto = {
    type: 'object',
    properties: {
        cloudAnchorId: {
            type: 'string'
        },
        position: {
            type: 'array',
            items: {
                type: 'number'
            }
        },
        altitude: {
            type: 'number'
        }
    },
    required: ['cloudAnchorId', 'position', 'altitude']
} as const;

export const $UpdateGeoObjectDto = {
    type: 'object',
    properties: {
        id: {
            type: 'string'
        },
        data: {
            type: 'object'
        }
    },
    required: ['id', 'data']
} as const;

export const $CreateGeoCommentDto = {
    type: 'object',
    properties: {
        position: {
            type: 'object'
        },
        altitude: {
            type: 'number'
        },
        orientation: {
            type: 'array',
            items: {
                type: 'number'
            }
        },
        scale: {
            type: 'array',
            items: {
                type: 'number'
            }
        },
        cloudAnchorId: {
            type: 'string'
        },
        metadata: {
            type: 'string'
        }
    },
    required: ['position', 'altitude', 'orientation', 'cloudAnchorId']
} as const;

export const $GeoComment = {
    type: 'object',
    properties: {
        type: {
            type: 'string'
        },
        anchor: {
            type: 'object'
        },
        anchor_latitude: {
            type: 'number'
        },
        metadata: {
            type: 'string',
            nullable: true
        },
        cloudAnchor: {
            '$ref': '#/components/schemas/CloudAnchor'
        },
        relPosition: {
            type: 'object'
        },
        relAltitude: {
            type: 'number'
        },
        relOrientation: {
            type: 'array',
            items: {
                type: 'number'
            }
        },
        createdAt: {
            format: 'date-time',
            type: 'string'
        },
        updatedAt: {
            format: 'date-time',
            type: 'string'
        },
        scene: {
            '$ref': '#/components/schemas/Scene'
        },
        text: {
            type: 'string'
        }
    },
    required: ['type', 'anchor', 'anchor_latitude', 'metadata', 'cloudAnchor', 'relPosition', 'relAltitude', 'relOrientation', 'createdAt', 'updatedAt', 'scene', 'text']
} as const;

export const $UpdateGeoCommentDto = {
    type: 'object',
    properties: {
        position: {
            type: 'object'
        },
        altitude: {
            type: 'number'
        },
        orientation: {
            type: 'array',
            items: {
                type: 'number'
            }
        },
        scale: {
            type: 'array',
            items: {
                type: 'number'
            }
        },
        cloudAnchorId: {
            type: 'string'
        },
        metadata: {
            type: 'string'
        }
    }
} as const;

export const $CreateSceneDto = {
    type: 'object',
    properties: {
        name: {
            type: 'string'
        },
        description: {
            type: 'string'
        },
        position: {
            type: 'array',
            items: {
                type: 'string'
            }
        },
        altitude: {
            type: 'number'
        },
        orientation: {
            type: 'array',
            items: {
                type: 'string'
            }
        },
        scale: {
            type: 'array',
            items: {
                type: 'string'
            }
        },
        managerIds: {
            type: 'array',
            items: {
                type: 'number'
            }
        }
    },
    required: ['name', 'position']
} as const;

export const $UpdateSceneDto = {
    type: 'object',
    properties: {
        name: {
            type: 'string'
        },
        description: {
            type: 'string'
        },
        position: {
            type: 'array',
            items: {
                type: 'string'
            }
        },
        altitude: {
            type: 'number'
        },
        orientation: {
            type: 'array',
            items: {
                type: 'string'
            }
        },
        scale: {
            type: 'array',
            items: {
                type: 'string'
            }
        },
        managerIds: {
            type: 'array',
            items: {
                type: 'number'
            }
        }
    }
} as const;

export const $CreateLabelDto = {
    type: 'object',
    properties: {
        name: {
            type: 'string',
            description: '标签名称'
        },
        description: {
            type: 'string',
            description: '标签描述'
        }
    },
    required: ['name']
} as const;

export const $UpdateLabelDto = {
    type: 'object',
    properties: {
        name: {
            type: 'string',
            description: '标签名称'
        },
        description: {
            type: 'string',
            description: '标签描述'
        }
    }
} as const;

export const $CreateWatermarkDto = {
    type: 'object',
    properties: {
        fileKey: {
            type: 'string'
        },
        watermark: {
            type: 'string'
        }
    },
    required: ['fileKey', 'watermark']
} as const;

export const $ExtractWatermarkDto = {
    type: 'object',
    properties: {
        fileKey: {
            type: 'string'
        },
        passwordImg: {
            type: 'number'
        },
        passwordWm: {
            type: 'number'
        },
        watermarkLength: {
            type: 'number'
        }
    },
    required: ['fileKey', 'passwordImg', 'passwordWm', 'watermarkLength']
} as const;