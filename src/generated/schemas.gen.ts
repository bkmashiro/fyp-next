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
        }
    },
    required: ['id', 'username', 'password', 'roles']
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