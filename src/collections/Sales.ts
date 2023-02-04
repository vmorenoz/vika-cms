import {CollectionBeforeValidateHook, CollectionConfig} from 'payload/types';
import payload from "payload";

export const beforeValidateSaleItem: CollectionBeforeValidateHook =
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
            stock += originalDoc.quantity;
        }
        stock -= data.quantity;

        await payload.update({
            collection: 'products',
            id: product.id,
            data: {
                stock,
            },
        });

        return data;
    };


export const beforeValidateSale: CollectionBeforeValidateHook =
    async ({
               data,
               req,
               operation,
               originalDoc,
           }) => {

        if (operation === 'update' && data.status === 'canceled') {
            const saleItems = await payload.find({
                collection: 'sale-items',
                where: {
                    sale: {
                        equals: data.id
                    }
                }
            });

            saleItems?.docs?.forEach((item: any) => {
                payload.update({
                    collection: 'products',
                    id: item.product.id,
                    data: {
                        stock: item.product.stock + item.quantity,
                    },
                });
            })
        }

        return data;
    }

export const Sales: CollectionConfig = {
    slug: 'sales',
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
            name: 'customer',
            type: 'text',
        },
        {
            name: 'status',
            type: 'select',
            options: [
                {
                    label: 'Pre Venta',
                    value: 'preSale',
                },
                {
                    label: 'Cerrada',
                    value: 'closed',
                },
                {
                    label: 'Pagada',
                    value: 'paid',
                },
                {
                    label: 'Anulada',
                    value: 'canceled',
                },
            ],
        },
    ],
    hooks: {
        beforeValidate: [beforeValidateSale]
    }
};

export const SaleItems: CollectionConfig = {
    slug: 'sale-items',
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
            name: 'sale',
            type: 'relationship',
            relationTo: 'sales',
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
        beforeValidate: [beforeValidateSaleItem],
    }
};
