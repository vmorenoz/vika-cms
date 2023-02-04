import {CollectionConfig} from "payload/types";

export const Products: CollectionConfig = {
    slug: 'products',
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
            name: 'description',
            type: 'textarea',
        },
        {
            name: 'purchasePrice',
            type: 'number',
        },
        {
            name: 'salePrice',
            type: 'number',
            required: true
        },
        {
            name: 'stock',
            type: 'number',
            required: true
        },
        {
            name: 'category',
            type: 'relationship',
            relationTo: 'categories',
            required: true,
        },
        {
            name: 'type',
            type: 'relationship',
            relationTo: 'types',
        },
        {
            name: 'internalCode',
            type: 'text',
        },
        {
            name: 'sellWithoutStock',
            type: "checkbox",
            defaultValue: true
        },
        {
            name: 'image',
            type: 'upload',
            relationTo: 'media',
        },
    ]
};