import {CollectionBeforeValidateHook, CollectionConfig} from 'payload/types';
import payload from "payload";

export const beforeValidatePurchaseItem: CollectionBeforeValidateHook =
    async ({
               data,
               req,
               operation,
               originalDoc,
           }) => {

        const product = await payload.findByID({
            collection: 'products',
            id: data.product,
        });

        let stock = product?.stock;

        if (originalDoc) {
            stock -= originalDoc.quantity;
        }
        stock += data.quantity;

        await payload.update({
            collection: 'products',
            id: product.id,
            data: {
                stock,
            },
        });

        return data;
    }

export const Purchases: CollectionConfig = {
    slug: 'purchases',
    admin: {
        useAsTitle: 'date',
    },
    access: {
        create: () => true,
        read: () => true,
        delete: () => true,
        update: () => true,
    },
    fields: [
        {
            name: 'date',
            type: 'date',
            required: true,
        },
        {
            name: 'provider',
            type: 'text',
        },
    ]
};

export const PurchaseItems: CollectionConfig = {
    slug: 'purchase-items',
    admin: {
        useAsTitle: 'id',
    },
    access: {
        create: () => true,
        read: () => true,
        delete: () => true,
        update: () => true,
    },
    fields: [
        {
            name: 'purchase',
            type: 'relationship',
            relationTo: 'purchases',
            required: true,
        },
        {
            name: 'product',
            type: 'relationship',
            relationTo: 'products',
            required: true,
        },
        {
            name: 'quantity',
            type: 'number',
            required: true
        },
        {
            name: 'unitPrice',
            type: 'number',
            required: true
        },
        {
            name: 'totalPrice',
            type: 'number',
            required: true
        },
    ],
    hooks: {
        beforeValidate: [beforeValidatePurchaseItem],
    }
};
