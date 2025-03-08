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

export const $Scene = {
    type: 'object',
    properties: {
        children: {
            type: 'array',
            items: {
                '$ref': '#/components/schemas/GeoObject'
            }
        }
    },
    required: ['children']
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
        geoObjects: {
            type: 'array',
            items: {
                '$ref': '#/components/schemas/GeoObject'
            }
        }
    },
    required: ['id', 'cloudAnchorId', 'anchor', 'geoObjects']
} as const;

export const $UpdateGeoObjectDto = {
    type: 'object',
    properties: {
        id: {
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
        cloudAnchorId: {
            type: 'string',
            nullable: true
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
        }
    },
    required: ['id']
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

export const $GeoImage = {
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
        ossFile: {
            '$ref': '#/components/schemas/File'
        }
    },
    required: ['type', 'anchor', 'anchor_latitude', 'metadata', 'cloudAnchor', 'relPosition', 'relAltitude', 'relOrientation', 'createdAt', 'updatedAt', 'scene', 'ossFile']
} as const;

export const $CreateCloudAnchorDto = {
    type: 'object',
    properties: {
        cloudAnchorId: {
            type: 'string'
        },
        anchorPosition: {
            type: 'array',
            items: {
                type: 'number'
            }
        }
    },
    required: ['cloudAnchorId', 'anchorPosition']
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