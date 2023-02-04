import { CollectionConfig } from 'payload/types';

export const Categories: CollectionConfig = {
    slug: 'categories',
    admin: {
        useAsTitle: 'name',
    },
    access: {
        create: () => true,
        read: () => true,
        delete: () => true,
        update: () => true,
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            required: true,
        },
    ]
};

export const Types: CollectionConfig = {
    slug: 'types',
    admin: {
        useAsTitle: 'name',
    },
    access: {
        create: () => true,
        read: () => true,
        delete: () => true,
        update: () => true,
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            required: true,
        },
        {
            name: 'category',
            type: 'relationship',
            relationTo: 'categories',
            required: true,
        }
    ]
};